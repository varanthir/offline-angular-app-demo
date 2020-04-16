import { Action } from '@ngrx/store'
import { checkTypes } from 'utils/ngrx/check-types'
import { OfflineFileUrl } from '../../dal/dto/offline-file-url';

export enum OfflineFilesActionTypes {
  REVOKE_OFFLINE_FILES_URLS = '[Albums/Offline Files] REVOKE_OFFLINE_FILES_URLS',
  CLEAR_OFFLINE_FILES_URLS = '[Albums/Offline Files] CLEAR_OFFLINE_FILES_URLS',

  GET_OFFLINE_FILES = '[Albums/Offline Files] GET_OFFLINE_FILES',
  GET_OFFLINE_FILES_SUCCESS = '[Albums/Offline Files] GET_OFFLINE_FILES_SUCCESS',
  GET_OFFLINE_FILES_ERROR = '[Albums/Offline Files] GET_OFFLINE_FILES_ERROR',
}

checkTypes(OfflineFilesActionTypes as any)

export class RevokeOfflineFilesUrlsAction implements Action {
  readonly type = OfflineFilesActionTypes.REVOKE_OFFLINE_FILES_URLS
}

export class ClearOfflineFilesUrlsAction implements Action {
  readonly type = OfflineFilesActionTypes.CLEAR_OFFLINE_FILES_URLS
}


export class GetOfflineFilesUrlsAction implements Action {
  readonly type = OfflineFilesActionTypes.GET_OFFLINE_FILES
  constructor(public readonly payload: { pictureIds: number[] }) {}
}

export class GetOfflineFilesUrlsSuccessAction implements Action {
  readonly type = OfflineFilesActionTypes.GET_OFFLINE_FILES_SUCCESS
  constructor(public readonly payload: {
    pictures: OfflineFileUrl[],
    thumbnails: OfflineFileUrl[],
  }) {}
}

export class GetOfflineFilesUrlsErrorAction implements Action {
  readonly type = OfflineFilesActionTypes.GET_OFFLINE_FILES_ERROR
  constructor(public readonly error: Error) {
    console.error(error)
  }
}


export type OfflineFilesActions
  = RevokeOfflineFilesUrlsAction
  | ClearOfflineFilesUrlsAction

  | GetOfflineFilesUrlsAction
  | GetOfflineFilesUrlsSuccessAction
  | GetOfflineFilesUrlsErrorAction
