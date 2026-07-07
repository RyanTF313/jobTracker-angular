import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { map } from 'rxjs';
import { StateService } from '@core/services/state.service';
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

  columns = COLUMNS;
  columnLabels = COLUMN_LABELS;

  metrics$ = this.state.jobs$.pipe(
    map((jobs) => {
      const metrics = calculateMetrics(jobs);
      const maxCount = Math.max(...Object.values(metrics.counts), 1);
      return { ...metrics, maxCount };
    }),
  );
}
