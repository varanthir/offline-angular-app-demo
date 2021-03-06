import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { ServiceWorkerAppState } from '../index'
import { ToggleIsStableAction } from './service-worker.actions'

@Injectable()
export class ServiceWorkerFacadeService {
  constructor(private readonly store: Store<ServiceWorkerAppState>) {}

  toggleShowIsStable(): void {
    this.store.dispatch(new ToggleIsStableAction())
  }
}
