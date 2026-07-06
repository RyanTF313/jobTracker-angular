import { Component, EventEmitter, Output } from '@angular/core';
import { COLUMNS, COLUMN_LABELS } from '@constants/columns.constants';

@Component({
  selector: 'app-column-head',
  standalone: true,
  imports: [],
  templateUrl: './column-head.component.html',
  styleUrl: './column-head.component.css',
})
export class ColumnHeadComponent {
  @Output() addJob = new EventEmitter<string>();
  
  columns = COLUMNS;
  labels = COLUMN_LABELS;

  handleAddJobClick(column: string) {
    this.addJob.emit(column);
  }
}
