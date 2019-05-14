import { Component, NgZone } from '@angular/core'
import { ServiceWorkerFacadeService } from './state/service-worker/service-worker.facade'
import { SwUpdate } from '@angular/service-worker'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-service-worker',
  templateUrl: './service-worker.component.html',
  styleUrls: ['./service-worker.component.scss']
})
export class ServiceWorkerComponent {
  public readonly updateAvailable$ = this.swUpdate.available.pipe(
    map(obj => JSON.stringify(obj, null, 2)))

  public get swIsEnabled(): boolean {
    return this.swUpdate.isEnabled
  }

  constructor(
    private readonly ngZone: NgZone,
    private readonly serviceWorkerFacade: ServiceWorkerFacadeService,
    private readonly swUpdate: SwUpdate,
  ) {}

  public toggleIsStable(): void {
    this.serviceWorkerFacade.toggleShowIsStable()
  }

  public setTimeoutInsideNgZone(): void {
    setTimeout(() => {
      console.log('NgZone.isInAngularZone() =>', NgZone.isInAngularZone())
    }, 2000)
  }

  public setTimeoutOutsideNgZone(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('NgZone.isInAngularZone() =>', NgZone.isInAngularZone())
      }, 2000)
    })
  }

  public checkForUpdate(): void {
    this.swUpdate.checkForUpdate().then(() => {}).catch(() => {})
  }
}
