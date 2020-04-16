import { Action } from '@ngrx/store'
import { Album } from '../../dal/dto/album'
import { checkTypes } from 'utils/ngrx/check-types'

export enum OfflineAlbumsActionTypes {
  GET_OFFLINE_ALBUMS = '[Albums/Offline] GET_OFFLINE_ALBUMS',
  GET_OFFLINE_ALBUMS_SUCCESS = '[Albums/Offline] GET_OFFLINE_ALBUMS_SUCCESS',
  GET_OFFLINE_ALBUMS_ERROR = '[Albums/Offline] GET_OFFLINE_ALBUMS_ERROR',

  GET_OFFLINE_ALBUM = '[Albums/Offline] GET_OFFLINE_ALBUM',
  GET_OFFLINE_ALBUM_SUCCESS = '[Albums/Offline] GET_OFFLINE_ALBUM_SUCCESS',
  GET_OFFLINE_ALBUM_ERROR = '[Albums/Offline] GET_OFFLINE_ALBUM_ERROR',

  DELETE_OFFLINE_ALBUM = '[Albums/Offline] DELETE_OFFLINE_ALBUM',
  DELETE_OFFLINE_ALBUM_SUCCESS = '[Albums/Offline] DELETE_OFFLINE_ALBUM_SUCCESS',
  DELETE_OFFLINE_ALBUM_ERROR = '[Albums/Offline] DELETE_OFFLINE_ALBUM_ERROR',
}

checkTypes(OfflineAlbumsActionTypes as any)

export class GetOfflineAlbumsAction implements Action {
  readonly type = OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS
}

export class GetOfflineAlbumsSuccessAction implements Action {
  readonly type = OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS_SUCCESS
  constructor(public readonly payload: { albums: Album[] }) {}
}

export class GetOfflineAlbumsErrorAction implements Action {
  readonly type = OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS_ERROR
  constructor(public readonly error: Error) {}
}


export class GetOfflineAlbumAction implements Action {
  readonly type = OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM
  constructor(public readonly payload: { albumId: number }) {}
}

export class GetOfflineAlbumSuccessAction implements Action {
  readonly type = OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM_SUCCESS
  constructor(public readonly payload: { album: Album }) {}
}

export class GetOfflineAlbumErrorAction implements Action {
  readonly type = OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM_ERROR
  constructor(public readonly error: Error) {}
}


export class DeleteOfflineAlbumAction implements Action {
  readonly type = OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM
  constructor(public readonly payload: { albumId: number }) {}
}

export class DeleteOfflineAlbumSuccessAction implements Action {
  readonly type = OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM_SUCCESS
}

export class DeleteOfflineAlbumErrorAction implements Action {
  readonly type = OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM_ERROR
  constructor(public readonly error: Error) {}
}

export type OfflineAlbumsActions
  = GetOfflineAlbumsAction
  | GetOfflineAlbumsSuccessAction
  | GetOfflineAlbumsErrorAction

  | GetOfflineAlbumAction
  | GetOfflineAlbumSuccessAction
  | GetOfflineAlbumErrorAction

  | DeleteOfflineAlbumAction
  | DeleteOfflineAlbumSuccessAction
  | DeleteOfflineAlbumErrorAction
