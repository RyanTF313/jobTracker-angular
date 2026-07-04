import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();

  username = '';

  constructor(private auth: AuthService) {}

  onSubmit(): void {
    if (!this.username.trim()) return;
    this.auth.login(this.username.trim());
    this.close.emit();
  }
}
