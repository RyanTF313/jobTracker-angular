import { Component, inject, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ColumnHeadComponent } from './column-head/column-head.component';
import { JobFormComponent, JobDetailComponent, JobListComponent, JobCardComponent } from '@features/jobs';
import { Job, JobStatus } from '@core/models';
import { StateService } from '@core/services/state.service';
import { AuthService } from '@core/services/auth.service';
import { COLUMNS } from '@constants/columns.constants';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [
    AsyncPipe,
    ColumnHeadComponent,
    JobCardComponent,
    JobFormComponent,
    JobDetailComponent,
    JobListComponent,
  ],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css',
})
export class JobBoardComponent {
  protected state = inject(StateService);
  protected auth = inject(AuthService);

  @ViewChild(JobFormComponent) private jobForm!: JobFormComponent;

  columns = COLUMNS;
  selectedJob: Job | null = null;

  handleAddJob(column: string) {
    this.jobForm.open(column as JobStatus);
  }

  handleCardClick(job: Job): void {
    this.selectedJob = job;
    this.jobForm.openEdit(job)
  }

  countInColumn(jobs: Job[], column: JobStatus): number {
    return jobs.filter((job) => job.status === column).length;
  }
}
