import { Injectable, OnInit } from '@angular/core';
import { AppState, AuthState, Job, JobStatus } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService implements OnInit {
  jobs$: BehaviorSubject<Job[]> = new BehaviorSubject([] as Job[]);
  filteredJobs$: BehaviorSubject<Job[]> = new BehaviorSubject([] as Job[]);
  useFilteredJobs$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  displayedJobs$: BehaviorSubject<Job[]> = new BehaviorSubject([] as Job[]);
  auth$: BehaviorSubject<AuthState> = new BehaviorSubject({
    isLoggedIn: false,
    user: null,
    isReturning: false,
  } as AuthState);
  hasSearchFilter$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    this.loadState();
  }

  addJob(
    position: string,
    company: string,
    status: JobStatus,
    notes: string,
    salary: string,
  ): Job {
    const newJob: Job = {
      position,
      company,
      status,
      notes,
      salary,
      owner: this.auth$.value.user,
      id: crypto.randomUUID(),
    };
    this.jobs$.next([...this.jobs$.value, newJob]);
    this.saveState();
    return newJob;
  }

  removeJob(jobId: string): void {
    this.jobs$.next(this.jobs$.value.filter((job: Job) => job.id !== jobId));
    this.saveState();
  }

  updateJob(jobId: string, updates: Partial<Job>): void {
    const jobIndex = this.jobs$.value.findIndex((job: Job) => job.id === jobId);
    if (jobIndex >= 0) {
      const job = this.jobs$.value[jobIndex];
      this.jobs$.value[jobIndex] = Object.assign(job, updates);
      this.saveState();
    }
  }

  setFilteredJobs(): void {
    this.useFilteredJobs$.next(
      this.jobs$.value.length > 0 || this.hasSearchFilter$.value,
    );
    this.filteredJobs$.next(
      this.useFilteredJobs$.value ? this.jobs$.value : this.getJobs(),
    );
  }

  saveState(): void {
    localStorage.setItem('jobTrackerState', JSON.stringify(this));
  }

  loadState(): void {
    const savedState: AppState = localStorage.getItem('jobTrackerState')
      ? JSON.parse(localStorage.getItem('jobTrackerState') as string)
      : null;

    if (savedState) {
      this.jobs$.next(savedState.jobs);
      this.filteredJobs$.next(savedState.filteredJobs);
    } else {
      this.saveState();
    }
  }

  getJobs(): Job[] {
    return this.jobs$.value.filter((job: Job) => job.owner === this.auth$.value.user);
  }
}
