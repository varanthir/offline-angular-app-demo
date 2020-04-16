import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AlbumsAppState, getStorageEstimateState } from '../index'
import { GetStorageEstimateAction } from './storage-estimate.actions';

@Injectable()
export class StorageEstimateFacadeService {
  readonly state$ = this.store.pipe(select(getStorageEstimateState))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  getStorageEstimate(): void {
    this.store.dispatch(new GetStorageEstimateAction())
  }
}
