import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppState, Job, JobStatus } from '../models';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

const STATE_KEY = 'jobTrackerState';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isBrowser: boolean;
  private auth = inject(AuthService);

  jobs$: BehaviorSubject<Job[]> = new BehaviorSubject([] as Job[]);
  filteredJobs$: BehaviorSubject<Job[]> = new BehaviorSubject([] as Job[]);
  useFilteredJobs$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  displayedJobs$: BehaviorSubject<Job[]> = new BehaviorSubject([] as Job[]);
  hasSearchFilter$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    this.loadState();
  }

  addJob(
    newJob: Job,
  ): void {
    this.jobs$.next([...this.jobs$.value, newJob]);
    this.saveState();
    this.setFilteredJobs();
  }

  removeJob(jobId: string): void {
    this.jobs$.next(this.jobs$.value.filter((job: Job) => job.id !== jobId));
    this.saveState();
    this.setFilteredJobs();
  }

  updateJob(jobId: string, updates: Partial<Job>): void {
    const jobIndex = this.jobs$.value.findIndex((job: Job) => job.id === jobId);
    if (jobIndex >= 0) {
      const job = this.jobs$.value[jobIndex];
      this.jobs$.value[jobIndex] = Object.assign(job, updates);
      this.saveState();
      this.setFilteredJobs();
    }
  }

  setFilteredJobs(jobs: Job[] = [], hasSearchFilter: boolean = false): void {
    this.hasSearchFilter$.next(hasSearchFilter);
    this.useFilteredJobs$.next(jobs.length > 0 || hasSearchFilter);
    this.filteredJobs$.next(
      this.useFilteredJobs$.value ? jobs : this.getJobs(),
    );
    this.displayedJobs$.next(this.filteredJobs$.value);
  }

  saveState(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(
      STATE_KEY,
      JSON.stringify({
        jobs: this.jobs$.value,
        filteredJobs: this.filteredJobs$.value,
      }),
    );
  }

  loadState(): void {
    if (!this.isBrowser) return;
    const savedState: AppState = localStorage.getItem(STATE_KEY)
      ? JSON.parse(localStorage.getItem(STATE_KEY) as string)
      : null;

    if (savedState) {
      this.jobs$.next(Array.isArray(savedState.jobs) ? savedState.jobs : []);
      this.filteredJobs$.next(
        Array.isArray(savedState.filteredJobs) ? savedState.filteredJobs : [],
      );
    } else {
      this.saveState();
    }
    this.setFilteredJobs();
  }

  getJobs(): Job[] {
    return this.jobs$.value?.filter((job: Job) => job.owner === this.auth.currentUser$.value);
  }
}
