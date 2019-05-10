import { Action } from '@ngrx/store'
import { Album } from '../dal/dto/album'
import { checkTypes } from 'utils/ngrx/check-types'

export enum AlbumsActionsTypes {
  GET_ALBUMS = '[Albums] GET_ALBUMS',
  GET_ALBUMS_SUCCESS = '[Albums] GET_ALBUMS_SUCCESS',
  GET_ALBUMS_ERROR = '[Albums] GET_ALBUMS_ERROR',

  GET_ALBUM = '[Albums] GET_ALBUM',
  GET_ALBUM_SUCCESS = '[Albums] GET_ALBUM_SUCCESS',
  GET_ALBUM_ERROR = '[Albums] GET_ALBUM_ERROR',
}

checkTypes(AlbumsActionsTypes as any)

export class GetAlbumsAction implements Action {
  public readonly type = AlbumsActionsTypes.GET_ALBUMS
}

export class GetAlbumsSuccessAction implements Action {
  public readonly type = AlbumsActionsTypes.GET_ALBUMS_SUCCESS
  constructor(public readonly payload: { albums: Album[] }) {}
}

export class GetAlbumsErrorAction implements Action {
  public readonly type = AlbumsActionsTypes.GET_ALBUMS_ERROR
  constructor(public readonly error: Error) {}
}


export class GetAlbumAction implements Action {
  public readonly type = AlbumsActionsTypes.GET_ALBUM
  constructor(public readonly payload: { albumId: number }) {}
}

export class GetAlbumSuccessAction implements Action {
  public readonly type = AlbumsActionsTypes.GET_ALBUM_SUCCESS
  constructor(public readonly payload: { album: Album }) {}
}

export class GetAlbumErrorAction implements Action {
  public readonly type = AlbumsActionsTypes.GET_ALBUM_ERROR
  constructor(public readonly error: Error) {}
}

export type AlbumsActions
  = GetAlbumsAction
  | GetAlbumsSuccessAction
  | GetAlbumsErrorAction

  | GetAlbumAction
  | GetAlbumSuccessAction
  | GetAlbumErrorAction
