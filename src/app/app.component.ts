import { Component, ApplicationRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { AppState, getOnlineState } from './reducers'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  public readonly onlineStatus$ = this.store.select(getOnlineState).pipe(
    map(isOnline => isOnline ? 'online' : 'offline'))

  private readonly isStableSub: Subscription = this.appRef.isStable.pipe(
    //
  ).subscribe(isStable => {
    console.log('# Stable:', isStable)
  })

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly store: Store<AppState>,
  ) {}

  public ngOnDestroy(): void {
    this.isStableSub.unsubscribe()
  }
}
