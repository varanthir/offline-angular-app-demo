import { Injectable } from '@angular/core'
import { ServiceWorkerAppState, getSafeShowIsStable } from 'app/service-worker/state'
import { Store, select } from '@ngrx/store'

@Injectable()
export class SafeDataFacadeService {
  readonly showIsStable$ = this.store.pipe(select(getSafeShowIsStable))

  constructor(private readonly store: Store<ServiceWorkerAppState>) {}
}
