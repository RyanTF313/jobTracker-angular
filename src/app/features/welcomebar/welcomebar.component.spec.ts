import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomebarComponent } from './welcomebar.component';

describe('WelcomebarComponent', () => {
  let component: WelcomebarComponent;
  let fixture: ComponentFixture<WelcomebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
