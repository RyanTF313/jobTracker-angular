import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StateService } from '@core/services/state.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  protected auth = inject(AuthService);
  private state = inject(StateService);

  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(150), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((searchTerm) => this.state.setSearchTerm(searchTerm));

    this.auth.currentUser$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.searchControl.setValue('', { emitEvent: false });
      });
  }
}
