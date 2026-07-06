import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Job } from '@core/models';
import { StateService } from '@core/services/state.service';
import { COLUMNS, COLUMN_LABELS } from '@constants/columns.constants';

@Component({
  selector: 'app-edit-job-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-job-modal.component.html',
  styleUrl: './edit-job-modal.component.css',
})
export class EditJobModalComponent {
  stateService = inject(StateService);

  @Output() closeForm = new EventEmitter<void>();

  @ViewChild('jobFormDialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('jobForm') jobForm?: NgForm;

  columns = COLUMNS;
  columnLabels = COLUMN_LABELS;

  currentJob: Job = this.blankJob();

  private blankJob(): Job {
    return {
      id: '',
      position: '',
      company: '',
      status: 'wishlist',
      notes: '',
      salary: '',
      owner: null,
    };
  }

  open(job: Job): void {
    this.currentJob = { ...job };
    this.jobForm?.resetForm(this.currentJob);
    this.dialogRef.nativeElement.showModal();
  }

  close(): void {
    this.dialogRef.nativeElement.close();
  }

  handleDialogClose(): void {
    this.jobForm?.resetForm();
    this.closeForm.emit();
  }

  save(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const updates: Partial<Job> = {
      position: form.value.position,
      company: form.value.company,
      status: form.value.status,
      notes: form.value.notes ?? '',
      salary: (form.value.salary ?? '').toString(),
    };

    this.stateService.updateJob(this.currentJob.id, updates);
    this.close();
  }

  remove(): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.stateService.removeJob(this.currentJob.id);
      this.close();
    }
  }
}
