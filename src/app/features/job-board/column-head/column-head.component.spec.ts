import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnHeadComponent } from './column-head.component';

describe('ColumnHeadComponent', () => {
  let component: ColumnHeadComponent;
  let fixture: ComponentFixture<ColumnHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
