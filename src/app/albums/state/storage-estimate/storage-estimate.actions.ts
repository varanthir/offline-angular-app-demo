import { Action } from '@ngrx/store'
import { checkTypes } from 'utils/ngrx/check-types'

export enum StorageEstimateActionsTypes {
  GET_STORAGE_ESTIMATE = '[Storage Estimate] GET_STORAGE_ESTIMATE',
  GET_STORAGE_ESTIMATE_SUCCESS = '[Storage Estimate] GET_STORAGE_ESTIMATE_SUCCESS',
  GET_STORAGE_ESTIMATE_ERROR = '[Storage Estimate] GET_STORAGE_ESTIMATE_ERROR',
}

checkTypes(StorageEstimateActionsTypes as any)

export class GetStorageEstimateAction implements Action {
  readonly type = StorageEstimateActionsTypes.GET_STORAGE_ESTIMATE
}

export class GetStorageEstimateSuccessAction implements Action {
  readonly type = StorageEstimateActionsTypes.GET_STORAGE_ESTIMATE_SUCCESS
  constructor(public readonly payload: { storageEstimate: StorageEstimate }) {}
}

export class GetStorageEstimateErrorAction implements Action {
  readonly type = StorageEstimateActionsTypes.GET_STORAGE_ESTIMATE_ERROR
  constructor(public readonly error: Error) {}
}


export type StorageEstimateActions
  = GetStorageEstimateAction
  | GetStorageEstimateSuccessAction
  | GetStorageEstimateErrorAction
