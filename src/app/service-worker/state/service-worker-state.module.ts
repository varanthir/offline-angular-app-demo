import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { SERVICE_WORKER_STATE_KEY } from './index'
import { serviceWorkerReducer } from './service-worker/service-worker.reducer';
import { ServiceWorkerFacadeService } from './service-worker/service-worker.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(SERVICE_WORKER_STATE_KEY, serviceWorkerReducer),
  ],
  providers: [
    ServiceWorkerFacadeService
  ]
})
export class ServiceWorkerStateModule {}
