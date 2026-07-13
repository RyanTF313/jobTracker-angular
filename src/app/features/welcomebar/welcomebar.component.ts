import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-welcomebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './welcomebar.component.html',
  styleUrl: './welcomebar.component.css',
})
export class WelcomebarComponent implements OnInit {
  currentUser = '';

  constructor(
    private auth: AuthService,
    private state: StateService,
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser$.value;
    this.currentUser = this.auth.isReturning
      ? `Welcome back, ${user}!`
      : `Welcome, ${user}!`;
  }

  onSubmit(): void {
    this.auth.logout();
  }

  onClearData(): void {
    if (!confirm('This will permanently delete all your job data. Continue?')) {
      return;
    }
    this.state.clearLocalStorage();
  }
}
