import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-nav',
  standalone: true,
  templateUrl: './view-nav.component.html',
  styleUrl: './view-nav.component.css',
})
export class ViewNavComponent {
  activeView: 'board' | 'analytics' = 'board';

  @Output() viewChanged = new EventEmitter<'board' | 'analytics'>();

  selectView(view: 'board' | 'analytics'): void {
    this.activeView = view;
    this.viewChanged.emit(view);
  }
}
