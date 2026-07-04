import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-welcomebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './welcomebar.component.html',
  styleUrl: './welcomebar.component.css',
})
export class WelcomebarComponent implements OnInit {
  currentUser = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.currentUser$.value;
    this.currentUser = this.auth.isReturning
      ? `Welcome back, ${user}!`
      : `Welcome, ${user}!`;
  }

  onSubmit(): void {
    this.auth.logout();
  }
}
