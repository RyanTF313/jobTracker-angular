import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '@core/models';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input({ required: true }) job!: Job;
  @Output() cardClicked = new EventEmitter<Job>();

  handleClick(): void {
    console.log(this.job)
    this.cardClicked.emit(this.job);
  }
}
