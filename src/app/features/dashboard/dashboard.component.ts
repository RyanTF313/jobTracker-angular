import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WelcomebarComponent } from '@features/welcomebar/welcomebar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, WelcomebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  
}
