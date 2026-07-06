import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobModalComponentComponent } from './add-job-modal-component.component';

describe('AddJobModalComponentComponent', () => {
  let component: AddJobModalComponentComponent;
  let fixture: ComponentFixture<AddJobModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
