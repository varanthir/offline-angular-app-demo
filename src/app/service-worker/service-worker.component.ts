import { Component, NgZone } from '@angular/core';
import { ServiceWorkerFacadeService } from './state/service-worker/service-worker.facade';

@Component({
  selector: 'app-service-worker',
  templateUrl: './service-worker.component.html',
  styleUrls: ['./service-worker.component.scss']
})
export class ServiceWorkerComponent {

  constructor(
    private readonly ngZone: NgZone,
    private readonly serviceWorkerFacade: ServiceWorkerFacadeService,
    ) { }

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
}
