import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const AUTH_KEY = 'jobTrackerAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<string | null>(null);
  isReturning = false;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  login(username: string): void {
    this.isReturning = false;
    this.isLoggedIn$.next(true);
    this.currentUser$.next(username);
    if (this.isBrowser) {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
    }
  }

  logout(): void {
    this.isReturning = false;
    this.isLoggedIn$.next(false);
    this.currentUser$.next(null);
    if (this.isBrowser) {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }

  checkSession(): void {
    if (!this.isBrowser) return;
    const saved = sessionStorage.getItem(AUTH_KEY);
    if (saved) {
      const { username } = JSON.parse(saved);
      this.isReturning = true;
      this.isLoggedIn$.next(true);
      this.currentUser$.next(username);
    }
  }
}
