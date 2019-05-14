import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { ServiceWorkerAppState } from '..';
import { ToggleIsStableAction } from './service-worker.actions';

@Injectable()
export class ServiceWorkerFacadeService {
  constructor(private readonly store: Store<ServiceWorkerAppState>) {}

  public toggleShowIsStable(): void {
    this.store.dispatch(new ToggleIsStableAction())
  }
}
