import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ServiceWorkerRoutingModule } from './service-worker-routing.module'
import { ServiceWorkerComponent } from './service-worker.component'
import { ServiceWorkerStateModule } from './state/service-worker-state.module'
import { MatCardModule, MatButtonModule } from '@angular/material'

@NgModule({
  declarations: [ServiceWorkerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ServiceWorkerRoutingModule,
    ServiceWorkerStateModule,
  ]
})
export class ServiceWorkerModule {}
