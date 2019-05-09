import { Component, ApplicationRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { map, debounceTime, skip } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { ScreenService } from './services/screen.service';
import { ConnectionService } from './services/connection.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  public readonly menuMode$ = this.screen.isMobile$.pipe(
    map(isMobile => isMobile ? 'over' : 'side'))

  public readonly connectivityIcon$ = this.connection.isOnline$.pipe(
    map(isOnline => isOnline ? 'wifi' : 'wifi_off'))

  private readonly notifyConnectivitySub: Subscription = this.connection.isOnline$.pipe(
    skip(1),
    map(isOnline => isOnline ? 'Connection is back' : 'App is offline'))
    .subscribe(message => {
      this.snackbar.open(message, undefined, { duration: 3000 })
    })

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
    private readonly connection: ConnectionService,
    private readonly screen: ScreenService,
    private readonly snackbar: MatSnackBar,
  ) {}

  public ngOnDestroy(): void {
    this.notifyConnectivitySub.unsubscribe()
    this.isStableSub.unsubscribe()
  }
}
