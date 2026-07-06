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
import { Job } from '@core/models';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [FormsModule],
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
  @Input() currentUser: string | null = null;
  @Output() closeForm = new EventEmitter<void>();

  @ViewChild('jobFormDialog') dialogRef!: ElementRef<HTMLDialogElement>;

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

  handleCancelClick(): void {
    this.closeForm.emit();
  }

  createJob(event: Event): void {
    event.preventDefault();
    const newJob: Job = {
      id: this.generateUniqueId(),
      position: (document.getElementById('position') as HTMLInputElement).value,
      company: (document.getElementById('company') as HTMLInputElement).value,
      status: this.column as Job['status'],
      notes: (document.getElementById('notes') as HTMLInputElement).value,
      salary: (document.getElementById('salary') as HTMLInputElement).value,
      owner: this.currentUser,
    };

    console.log('New Job:', newJob);
  }

  generateUniqueId(): string {
    return crypto.randomUUID();
  }
}
