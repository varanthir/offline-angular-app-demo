import { Action } from '@ngrx/store'
import { Album } from '../../dal/dto/album'
import { checkTypes } from 'utils/ngrx/check-types'

export enum OnlineAlbumsActionTypes {
  GET_ONLINE_ALBUMS = '[Albums/Online] GET_ONLINE_ALBUMS',
  GET_ONLINE_ALBUMS_SUCCESS = '[Albums/Online] GET_ONLINE_ALBUMS_SUCCESS',
  GET_ONLINE_ALBUMS_ERROR = '[Albums/Online] GET_ONLINE_ALBUMS_ERROR',

  GET_ONLINE_ALBUM = '[Albums/Online] GET_ONLINE_ALBUM',
  GET_ONLINE_ALBUM_SUCCESS = '[Albums/Online] GET_ONLINE_ALBUM_SUCCESS',
  GET_ONLINE_ALBUM_ERROR = '[Albums/Online] GET_ONLINE_ALBUM_ERROR',
}

checkTypes(OnlineAlbumsActionTypes as any)

export class GetOnlineAlbumsAction implements Action {
  readonly type = OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS
}

export class GetOnlineAlbumsSuccessAction implements Action {
  readonly type = OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS_SUCCESS
  constructor(public readonly payload: { albums: Album[] }) {}
}

export class GetOnlineAlbumsErrorAction implements Action {
  readonly type = OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS_ERROR
  constructor(public readonly error: Error) {}
}


export class GetOnlineAlbumAction implements Action {
  readonly type = OnlineAlbumsActionTypes.GET_ONLINE_ALBUM
  constructor(public readonly payload: { albumId: number }) {}
}

export class GetOnlineAlbumSuccessAction implements Action {
  readonly type = OnlineAlbumsActionTypes.GET_ONLINE_ALBUM_SUCCESS
  constructor(public readonly payload: { album: Album }) {}
}

export class GetOnlineAlbumErrorAction implements Action {
  readonly type = OnlineAlbumsActionTypes.GET_ONLINE_ALBUM_ERROR
  constructor(public readonly error: Error) {}
}

export type OnlineAlbumsActions
  = GetOnlineAlbumsAction
  | GetOnlineAlbumsSuccessAction
  | GetOnlineAlbumsErrorAction

  | GetOnlineAlbumAction
  | GetOnlineAlbumSuccessAction
  | GetOnlineAlbumErrorAction
