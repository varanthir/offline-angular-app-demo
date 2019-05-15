import { Component, ApplicationRef, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { map, skip } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { ScreenService } from './services/screen.service'
import { ConnectionService } from './services/connection.service'
import { MatSnackBar, MatSidenavContent } from '@angular/material'
import { SafeDataFacadeService } from './state/safe-data.facade'
import { ContentScrollService } from './services/content-scroll.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  @ViewChild(MatSidenavContent) public set mainContentRef(mainContentRef: MatSidenavContent) {
    this.contentScroll.registerElement(mainContentRef.getElementRef().nativeElement)
  }

  public readonly menuMode$ = this.screen.isMobile$.pipe(
    map(isMobile => isMobile ? 'over' : 'side'))

  public readonly connectivityIcon$ = this.connection.isOnline$.pipe(
    map(isOnline => isOnline ? 'wifi' : 'signal_wifi_off'))

  public readonly showIsStable$ = this.safeDataFacade.showIsStable$

  private readonly notifyConnectivitySub: Subscription = this.connection.isOnline$.pipe(
    skip(1),
    map(isOnline => isOnline ? 'Connection is back' : 'App is offline'))
    .subscribe(message => {
      this.snackbar.open(message, undefined, { duration: 3000 })
    })

  private readonly isStableSub: Subscription = this.appRef.isStable.subscribe(isStable => {
    try {
      document.getElementById('is-stable-info')!.innerText = `${isStable}`
    } catch (e) { /*noop*/ }
  })

  public get startOpened(): boolean {
    return !this.screen.isMobile
  }

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly connection: ConnectionService,
    private readonly safeDataFacade: SafeDataFacadeService,
    private readonly screen: ScreenService,
    private readonly contentScroll: ContentScrollService,
    private readonly snackbar: MatSnackBar,
  ) {}

  public ngOnDestroy(): void {
    this.notifyConnectivitySub.unsubscribe()
    this.isStableSub.unsubscribe()
  }
}
