import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Job } from '../models';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

const STATE_KEY = 'jobTrackerState';

const VALID_STATUSES = new Set([
  'wishlist',
  'applied',
  'interviewing',
  'offer',
  'rejected',
]);

function isJobRecord(value: unknown): value is Job {
  if (typeof value !== 'object' || value === null) return false;
  const job = value as Record<string, unknown>;
  return (
    typeof job['id'] === 'string' &&
    typeof job['position'] === 'string' &&
    typeof job['company'] === 'string' &&
    typeof job['status'] === 'string' &&
    VALID_STATUSES.has(job['status'] as string) &&
    (typeof job['owner'] === 'string' || job['owner'] === null)
  );
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isBrowser: boolean;
  private auth = inject(AuthService);

  jobs$ = new BehaviorSubject<Job[]>([]);
  searchTerm$ = new BehaviorSubject<string>('');
  displayedJobs$ = new BehaviorSubject<Job[]>([]);

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    this.loadState();
    this.auth.currentUser$.subscribe(() => {
      this.searchTerm$.next('');
      this.recomputeDisplayedJobs();
    });
  }

  addJob(newJob: Job): void {
    this.jobs$.next([...this.jobs$.value, newJob]);
    this.saveState();
    this.recomputeDisplayedJobs();
  }

  removeJob(jobId: string): void {
    const user = this.auth.currentUser$.value;
    this.jobs$.next(
      this.jobs$.value.filter(
        (job: Job) => !(job.id === jobId && job.owner === user),
      ),
    );
    this.saveState();
    this.recomputeDisplayedJobs();
  }

  updateJob(jobId: string, updates: Partial<Job>): void {
    const user = this.auth.currentUser$.value;
    const jobIndex = this.jobs$.value.findIndex(
      (job: Job) => job.id === jobId && job.owner === user,
    );
    if (jobIndex < 0) return;

    const safeUpdates = { ...updates };
    if (
      safeUpdates.status !== undefined &&
      !VALID_STATUSES.has(safeUpdates.status)
    ) {
      delete safeUpdates.status;
    }

    const nextJobs = this.jobs$.value.map((job, index) =>
      index === jobIndex
        ? { ...job, ...safeUpdates, owner: job.owner, id: job.id }
        : job,
    );
    this.jobs$.next(nextJobs);
    this.saveState();
    this.recomputeDisplayedJobs();
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
    this.recomputeDisplayedJobs();
  }

  recomputeDisplayedJobs(): void {
    const term = this.searchTerm$.value.trim().toLowerCase();
    const owned = this.getJobs();
    const displayed = !term
      ? owned
      : owned.filter(
          (job: Job) =>
            job.company.toLowerCase().includes(term) ||
            job.position.toLowerCase().includes(term),
        );
    this.displayedJobs$.next(displayed);
  }

  saveState(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(
        STATE_KEY,
        JSON.stringify({ jobs: this.jobs$.value }),
      );
    } catch {
      // Quota or private-mode write failures should not crash the app.
    }
  }

  loadState(): void {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) {
        this.saveState();
        this.recomputeDisplayedJobs();
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      const jobs =
        typeof parsed === 'object' &&
        parsed !== null &&
        Array.isArray((parsed as { jobs?: unknown }).jobs)
          ? ((parsed as { jobs: unknown[] }).jobs.filter(isJobRecord) as Job[])
          : [];
      this.jobs$.next(jobs);
    } catch {
      this.jobs$.next([]);
    }
    this.recomputeDisplayedJobs();
  }

  /** Deletes only the current user's jobs, preserving other local identities. */
  clearCurrentUserJobs(): void {
    if (!this.isBrowser) return;
    const user = this.auth.currentUser$.value;
    const remaining = this.jobs$.value.filter((job: Job) => job.owner !== user);
    this.jobs$.next(remaining);
    this.searchTerm$.next('');
    this.saveState();
    this.recomputeDisplayedJobs();
  }

  getJobs(): Job[] {
    return this.jobs$.value.filter(
      (job: Job) => job.owner === this.auth.currentUser$.value,
    );
  }
}
