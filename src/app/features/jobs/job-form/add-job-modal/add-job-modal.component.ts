import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Job, JobStatus } from '@core/models';
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-add-job-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-job-modal.component.html',
  styleUrl: './add-job-modal.component.css',
})
export class AddJobModalComponent implements OnInit {
  stateService = inject(StateService);

  @Input() targetColumn: JobStatus | null = null;
  @Input() currentUser: string | null = null;
  @Output() closeForm = new EventEmitter<void>();

  @ViewChild('jobFormDialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('jobForm') jobForm?: NgForm;

  newJob: Job | null = null;

  ngOnInit(): void {
    this.newJob = this.blankJob();
  }

  open(column: JobStatus): void {
    this.targetColumn = column;
    this.newJob = this.blankJob();
    this.jobForm?.resetForm(this.newJob);
    this.dialogRef.nativeElement.showModal();
  }

  close(): void {
    this.dialogRef.nativeElement.close();
  }

  handleDialogClose(): void {
    this.newJob = this.blankJob();
    this.jobForm?.resetForm(this.newJob);
    this.closeForm.emit();
  }

  private blankJob(): Job {
    return {
      id: '',
      position: '',
      company: '',
      status: this.targetColumn as Job['status'],
      notes: '',
      salary: '',
      owner: this.currentUser,
    };
  }

  createJob(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const job: Job = {
      id: this.generateUniqueId(),
      position: form.value.position,
      company: form.value.company,
      status: this.targetColumn as Job['status'],
      notes: form.value.notes ?? '',
      salary: (form.value.salary ?? '').toString(),
      owner: this.currentUser,
    };

    this.stateService.addJob(job);
    this.close();
  }

  generateUniqueId(): string {
    return crypto.randomUUID();
  }
}
