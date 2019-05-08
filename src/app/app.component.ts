import { Component, ApplicationRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, debounceTime } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { getOnlineState } from './state/offline/selectors';
import { AppState } from './state/reducer';
import { ScreenService } from './services/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  public readonly onlineStatus$ = this.store.select(getOnlineState).pipe(
    map(isOnline => isOnline ? 'online' : 'offline'))

  public readonly menuMode$ = this.screen.isMobile$.pipe(
    map(isMobile => isMobile ? 'over' : 'side'))

  private readonly isStableSub: Subscription = this.appRef.isStable.pipe(
    debounceTime(200)
  ).subscribe(isStable => {
    console.log('# Stable:', isStable)
  })

  public get startOpened(): boolean {
    return !this.screen.isMobile
  }

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly screen: ScreenService,
    private readonly store: Store<AppState>,
  ) {}

  public ngOnDestroy(): void {
    this.isStableSub.unsubscribe()
  }
}
