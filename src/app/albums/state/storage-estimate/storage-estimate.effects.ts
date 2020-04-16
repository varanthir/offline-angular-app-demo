import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of, from } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import {
  StorageEstimateActions,
  StorageEstimateActionsTypes,
  GetStorageEstimateSuccessAction,
  GetStorageEstimateErrorAction,
} from './storage-estimate.actions'

@Injectable()
export class StorageEstimateEffects {

  @Effect()
  readonly getStorageEstimate$: Observable<Action> = this.actions$.pipe(
    ofType(StorageEstimateActionsTypes.GET_STORAGE_ESTIMATE),
    switchMap(() => from(navigator.storage.estimate()).pipe(
      map(storageEstimate => new GetStorageEstimateSuccessAction({ storageEstimate })),
      catchError((error: Error) => of(new GetStorageEstimateErrorAction(error))),
    ))
  )

  constructor(private readonly actions$: Actions<StorageEstimateActions>) {}
}
