import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[app-failed-action]',
  templateUrl: './failed-action.component.html',
  styleUrls: ['./failed-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailedActionComponent {
  @Output() public readonly tryAgain = new EventEmitter<void>()
}
