import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Job, JobStatus } from '@core/models';
import { AuthService } from '@core/services';
import { Subscription } from 'rxjs';
import { AddJobModalComponentComponent } from './add-job-modal-component/add-job-modal-component.component';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [FormsModule, AddJobModalComponentComponent],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css',
})
export class JobFormComponent implements OnChanges, OnInit, OnDestroy {
  private auth = inject(AuthService);
  private userSubscription = new Subscription();

  @Input() isOpen = false;
  @Input() column: string | null = null;
  @Input() job: Job | null = null;
  @Input() isEditMode = false;
  @Output() closeForm = new EventEmitter<void>();

  @ViewChild('jobFormDialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild(AddJobModalComponentComponent) private addJobModal?: AddJobModalComponentComponent;

  user: string | null = null;

  ngOnChanges(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;

    if (this.isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!this.isOpen && dialog.open) {
      dialog.close();
    }
  }

  ngOnInit() {
    this.userSubscription = this.auth.currentUser$.subscribe(
      (auth: string | null) => {
        this.user = auth;
      },
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  open(column: JobStatus): void {
    this.addJobModal?.open(column);
  }

  handleCancelClick(): void {
    this.closeForm.emit();
  }
}
