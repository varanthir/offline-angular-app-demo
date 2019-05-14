import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromServiceWorker from './service-worker/service-worker.reducer'

export const SERVICE_WORKER_STATE_KEY = 'serviceWorker'

export type ServiceWorkerAppState = {
  [SERVICE_WORKER_STATE_KEY]: fromServiceWorker.ServiceWorkerState,
}

export const getServiceWorkerState =
  createFeatureSelector<ServiceWorkerAppState, fromServiceWorker.ServiceWorkerState>(SERVICE_WORKER_STATE_KEY)

export const getSafeShowIsStable = createSelector(
  getServiceWorkerState,
  state => state ? state.showIsStable : false
)
