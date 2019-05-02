import { Action } from '@ngrx/store'
import { type } from 'utils/ngrx/type'
import { Album } from './dto/album'

export const AlbumsActions = {
  GET_ALBUMS: type('[Albums] GET_ALBUMS'),
  GET_ALBUMS_SUCCESS: type('[Albums] GET_ALBUMS_SUCCESS'),
  GET_ALBUMS_ERROR: type('[Albums] GET_ALBUMS_ERROR'),

  GET_ALBUM: type('[Albums] GET_ALBUM'),
  GET_ALBUM_SUCCESS: type('[Albums] GET_ALBUM_SUCCESS'),
  GET_ALBUM_ERROR: type('[Albums] GET_ALBUM_ERROR'),
}


export class GetAlbumsAction implements Action {
  public readonly type = AlbumsActions.GET_ALBUMS
}

export class GetAlbumsSuccessAction implements Action {
  public readonly type = AlbumsActions.GET_ALBUMS_SUCCESS

  constructor(public readonly payload: { albums: Album[] }) {}
}

export class GetAlbumsErrorAction implements Action {
  public readonly type = AlbumsActions.GET_ALBUMS_ERROR

  constructor(public readonly error: Error) {}
}


export class GetAlbumAction implements Action {
  public readonly type = AlbumsActions.GET_ALBUM

  constructor(public readonly payload: { albumId: number }) {}
}

export class GetAlbumSuccessAction implements Action {
  public readonly type = AlbumsActions.GET_ALBUM_SUCCESS

  constructor(public readonly payload: { album: Album }) {}
}

export class GetAlbumErrorAction implements Action {
  public readonly type = AlbumsActions.GET_ALBUM_ERROR

  constructor(public readonly error: Error) {}
}
