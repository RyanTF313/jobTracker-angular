import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { LoginComponent } from './features/auth/login/login.component';
import {
  WelcomebarComponent,
  ViewNavComponent,
  JobBoardComponent,
  SearchBarComponent,
  AnalyticsComponent,
} from '@features/index';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    LoginComponent,
    WelcomebarComponent,
    ViewNavComponent,
    JobBoardComponent,
    SearchBarComponent,
    AnalyticsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected auth = inject(AuthService);

  activeView: 'board' | 'analytics' = 'board';

  constructor() {
    this.auth.isLoggedIn$.pipe(takeUntilDestroyed()).subscribe((loggedIn) => {
      if (loggedIn) this.activeView = 'board';
    });
  }

  ngOnInit(): void {
    this.auth.checkSession();
  }
}
