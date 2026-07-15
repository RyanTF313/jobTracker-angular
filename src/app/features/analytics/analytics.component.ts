import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { StateService } from '@core/services/state.service';
import { AuthService } from '@core/services/auth.service';
import { COLUMNS, COLUMN_LABELS } from '@constants/columns.constants';
import { calculateMetrics } from '@utils/analytics.utils';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  private state = inject(StateService);
  private auth = inject(AuthService);

  columns = COLUMNS;
  columnLabels = COLUMN_LABELS;

  metrics$ = combineLatest([this.state.jobs$, this.auth.currentUser$]).pipe(
    map(() => {
      const metrics = calculateMetrics(this.state.getJobs());
      const maxCount = Math.max(...Object.values(metrics.counts), 1);
      return { ...metrics, maxCount };
    }),
  );
}
