import { Action } from '@ngrx/store'
import { checkTypes } from 'utils/ngrx/check-types'
import { Album } from '../dal/dto/album'

export enum DownloadAlbumActionsTypes {
  DOWNLOAD_ALBUM = '[Download Album] DOWNLOAD_ALBUM',
  DOWNLOAD_ALBUM_SUCCESS = '[Download Album] DOWNLOAD_ALBUM_SUCCESS',
  DOWNLOAD_ALBUM_ERROR = '[Download Album] DOWNLOAD_ALBUM_ERROR',

  DOWNLOAD_PICTURES = '[Download Album] DOWNLOAD_PICTURES',
  DOWNLOAD_PICTURES_SUCCESS = '[Download Album] DOWNLOAD_PICTURES_SUCCESS',
  DOWNLOAD_PICTURES_ERROR = '[Download Album] DOWNLOAD_PICTURES_ERROR',

  DOWNLOAD_PICTURE = '[Download Album] DOWNLOAD_PICTURE',
  DOWNLOAD_PICTURE_PROGRESS = '[Download Album] DOWNLOAD_PICTURE_PROGRESS',
  DOWNLOAD_PICTURE_SAVE = '[Download Album] DOWNLOAD_PICTURE_SAVE',
  DOWNLOAD_PICTURE_SUCCESS = '[Download Album] DOWNLOAD_PICTURE_SUCCESS',
  DOWNLOAD_PICTURE_ERROR = '[Download Album] DOWNLOAD_PICTURE_ERROR',

  DOWNLOAD_THUMBNAIL = '[Download Album] DOWNLOAD_THUMBNAIL',
  DOWNLOAD_THUMBNAIL_PROGRESS = '[Download Album] DOWNLOAD_THUMBNAIL_PROGRESS',
  DOWNLOAD_THUMBNAIL_SAVE = '[Download Album] DOWNLOAD_THUMBNAIL_SAVE',
  DOWNLOAD_THUMBNAIL_SUCCESS = '[Download Album] DOWNLOAD_THUMBNAIL_SUCCESS',
  DOWNLOAD_THUMBNAIL_ERROR = '[Download Album] DOWNLOAD_THUMBNAIL_ERROR',

  DOWNLOAD_ALBUM_CANCEL = '[Download Album] DOWNLOAD_ALBUM_CANCEL',
  DOWNLOAD_ALBUM_CLEAR = '[Download Album] DOWNLOAD_ALBUM_CLEAR',
}

checkTypes(DownloadAlbumActionsTypes as any)

export class DownloadAlbumAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_ALBUM
  constructor(public readonly payload: { album: Album }) {}
}

export class DownloadAlbumSuccessAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_SUCCESS
}

export class DownloadAlbumErrorAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_ERROR
  constructor(public readonly error: Error) {}
}


export class DownloadPicturesAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURES
  constructor(public readonly payload: { pictureIds: number[] }) {}
}

export class DownloadPicturesSuccessAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURES_SUCCESS
}

export class DownloadPicturesErrorAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURES_ERROR
  constructor(public readonly error: Error) {}
}


export class DownloadPictureAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURE
  constructor(public readonly payload: { pictureId: number }) {}
}

export class DownloadPictureProgressAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_PROGRESS
  constructor(public readonly payload: { pictureId: number, progress: number }) {}
}

export class DownloadPictureSaveAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_SAVE
  constructor(public readonly payload: { pictureId: number, blob: Blob }) {}
}

export class DownloadPictureSuccessAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_SUCCESS
  constructor(public readonly payload: { pictureId: number }) {}
}

export class DownloadPictureErrorAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_ERROR
  constructor(public readonly error: Error) {}
}


export class DownloadThumbnailAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL
  constructor(public readonly payload: { pictureId: number }) {}
}

export class DownloadThumbnailProgressAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_PROGRESS
  constructor(public readonly payload: { pictureId: number, progress: number }) {}
}

export class DownloadThumbnailSaveAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_SAVE
  constructor(public readonly payload: { pictureId: number, blob: Blob }) {}
}

export class DownloadThumbnailSuccessAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_SUCCESS
  constructor(public readonly payload: { pictureId: number }) {}
}

export class DownloadThumbnailErrorAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_ERROR
  constructor(public readonly error: Error) {}
}


export class DownloadAlbumCancelAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_CANCEL
}

export class DownloadAlbumClearAction implements Action {
  public readonly type = DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_CLEAR
}


export type DownloadAlbumActions
  = DownloadAlbumAction
  | DownloadAlbumSuccessAction
  | DownloadAlbumErrorAction

  | DownloadPicturesAction
  | DownloadPicturesSuccessAction
  | DownloadPicturesErrorAction

  | DownloadPictureAction
  | DownloadPictureProgressAction
  | DownloadPictureSaveAction
  | DownloadPictureSuccessAction
  | DownloadPictureErrorAction

  | DownloadThumbnailAction
  | DownloadThumbnailProgressAction
  | DownloadThumbnailSaveAction
  | DownloadThumbnailSuccessAction
  | DownloadThumbnailErrorAction

  | DownloadAlbumCancelAction
  | DownloadAlbumClearAction
