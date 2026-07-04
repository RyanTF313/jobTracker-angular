import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { LoginComponent } from './features/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private auth = inject(AuthService);

  isLoggedIn = toSignal(this.auth.isLoggedIn$, { initialValue: false });

  ngOnInit(): void {
    this.auth.checkSession();
  }
}
