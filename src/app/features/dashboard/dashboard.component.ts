import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WelcomebarComponent, JobBoardComponent } from '@features/index';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, WelcomebarComponent, JobBoardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  
}
