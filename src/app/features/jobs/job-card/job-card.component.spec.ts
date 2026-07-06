import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardComponent } from './job-card.component';
import { Job } from '@core/models';

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;

  const job: Job = {
    id: '1',
    position: 'Engineer',
    company: 'Acme',
    status: 'wishlist',
    notes: '',
    salary: '',
    owner: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    component.job = job;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardClicked with the job when clicked', () => {
    const emitted: Job[] = [];
    component.cardClicked.subscribe((j) => emitted.push(j));

    component.handleClick();

    expect(emitted).toEqual([job]);
  });
});
