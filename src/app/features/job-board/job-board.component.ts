import { Component, inject } from '@angular/core';
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

  columns = COLUMNS;
  isJobFormOpen = false;
  currentColumn: JobStatus | null = null;
  selectedJob: Job | null = null;

  handleAddJob(column: string) {
    this.currentColumn = column as JobStatus;
    this.isJobFormOpen = true;
  }

  handleJobFormClose() {
    this.isJobFormOpen = false;
  }

  handleCardClick(job: Job): void {
    this.selectedJob = job;
  }

  countInColumn(jobs: Job[], column: JobStatus): number {
    return jobs.filter((job) => job.status === column).length;
  }
}
