import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerComponent } from './service-worker.component';

const routes: Routes = [
  { path: '', component: ServiceWorkerComponent },
  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceWorkerRoutingModule { }
