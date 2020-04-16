import { Component, NgZone, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ServiceWorkerFacadeService } from './state/service-worker/service-worker.facade'
import { SwUpdate } from '@angular/service-worker'
import { map } from 'rxjs/operators'
import { ContentScrollService } from 'app/services/content-scroll.service'

@Component({
  selector: 'app-service-worker',
  templateUrl: './service-worker.component.html',
  styleUrls: ['./service-worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceWorkerComponent implements OnInit {
  readonly updateAvailable$ = this.swUpdate.available.pipe(
    map(obj => JSON.stringify(obj, null, 2)))

  get swIsEnabled(): boolean {
    return this.swUpdate.isEnabled
  }

  constructor(
    private readonly ngZone: NgZone,
    private readonly serviceWorkerFacade: ServiceWorkerFacadeService,
    private readonly contentScroll: ContentScrollService,
    private readonly swUpdate: SwUpdate,
  ) {}

  ngOnInit(): void {
    this.contentScroll.scrollTop()
  }

  toggleIsStable(): void {
    this.serviceWorkerFacade.toggleShowIsStable()
  }

  setTimeoutInsideNgZone(): void {
    setTimeout(() => {
      console.log('NgZone.isInAngularZone() =>', NgZone.isInAngularZone())
    }, 2000)
  }

  setTimeoutOutsideNgZone(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('NgZone.isInAngularZone() =>', NgZone.isInAngularZone())
      }, 2000)
    })
  }

  checkForUpdate(): void {
    this.swUpdate.checkForUpdate().then(() => {}).catch(() => {})
  }
}
