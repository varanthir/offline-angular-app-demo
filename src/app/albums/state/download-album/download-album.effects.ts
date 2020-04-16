import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of, forkJoin } from 'rxjs'

import { catchError, map, mergeMap, bufferCount, first, takeUntil } from 'rxjs/operators'
import {
  DownloadAlbumActions,
  DownloadAlbumActionsTypes,
  DownloadAlbumErrorAction,
  DownloadPictureAction,
  DownloadPictureErrorAction,
  DownloadPicturesAction,
  DownloadPictureSuccessAction,
  DownloadThumbnailAction,
  DownloadPictureProgressAction,
  DownloadThumbnailSuccessAction,
  DownloadThumbnailProgressAction,
  DownloadPictureSaveAction,
  DownloadThumbnailSaveAction,
  DownloadThumbnailErrorAction,
  DownloadPicturesSuccessAction,
  DownloadAlbumSuccessAction,
} from './download-album.actions'
import { AlbumsDaoService } from '../dal/dao/albums.dao'
import { trackProgress } from 'utils/rxjs/track-progress'
import { AlbumsStorageService } from '../dal/dao/albums.storage'
import { AlbumsFinishedStorageService } from '../dal/dao/albums-finished.storage'
import { PicturesStorageService } from '../dal/dao/pictures.storage'
import { ThumbnailsStorageService } from '../dal/dao/thumbnails.storage'
import { GetOfflineAlbumsAction } from '../albums/offline-albums/offline-albums.actions'
import { PictureArrayBufferBlob } from '../dal/dto/picture-array-buffer-blob'
import { GetStorageEstimateAction } from '../storage-estimate/storage-estimate.actions'

@Injectable()
export class DownloadAlbumEffects {
  readonly downloadErrors$ = this.actions$.pipe(
    ofType(
      DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_ERROR,
      DownloadAlbumActionsTypes.DOWNLOAD_PICTURES_ERROR,
      DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_ERROR,
      DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_ERROR,
      DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_CANCEL,
    )
  )

  readonly downloadPictureOrThumbnailSuccess$ = this.actions$.pipe(
    ofType(
      DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_SUCCESS,
      DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_SUCCESS,
    )
  )

  @Effect()
  readonly startDownloadAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_ALBUM),
    map(action => action.payload),
    mergeMap(({ album }) => forkJoin([
      this.albumsStorage.set(album),
      this.albumsFinishedStorage.set({ id: album.id, isFinished: false })
    ]).pipe(
      map(() => album.pictures.map(({ id }) => id)),
      map(pictureIds => new DownloadPicturesAction({ pictureIds })),
      catchError((error: Error) => of(new DownloadAlbumErrorAction(error))),
      takeUntil(this.downloadErrors$)
    ))
  )

  @Effect()
  readonly startDownloadPictures$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_PICTURES),
    map(action => action.payload),
    mergeMap(({ pictureIds }) => [
      ...pictureIds.map(pictureId => new DownloadPictureAction({ pictureId })),
      ...pictureIds.map(pictureId => new DownloadThumbnailAction({ pictureId })),
    ]),
  )

  @Effect()
  readonly getPicture$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_PICTURE),
    map(action => action.payload),
    mergeMap(({ pictureId }) => this.albumsDao.getPictureFile(pictureId).pipe(
      trackProgress(),
      map((result: number | Blob) => result instanceof Blob
        ? new DownloadPictureSaveAction({ pictureId, blob: result })
        : new DownloadPictureProgressAction({ pictureId, progress: result })
      ),
      catchError((error: Error) => of(new DownloadPictureErrorAction(error))),
      takeUntil(this.downloadErrors$)
    ))
  )

  @Effect()
  readonly savePicture$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_SAVE),
    map(action => action.payload),
    mergeMap(({ pictureId, blob }) => PictureArrayBufferBlob.fromBlob(pictureId, blob).pipe(
      mergeMap(arrayBufferBlob => this.picturesStorage.set(arrayBufferBlob)),
      map(() => new DownloadPictureSuccessAction({ pictureId })),
      catchError((error: Error) => of(new DownloadPictureErrorAction(error))),
      takeUntil(this.downloadErrors$)
    ))
  )

  @Effect()
  readonly getThumbnail$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL),
    map(action => action.payload),
    mergeMap(({ pictureId }) => this.albumsDao.getThumbnailFile(pictureId).pipe(
      trackProgress(),
      map((result: number | Blob) => result instanceof Blob
        ? new DownloadThumbnailSaveAction({ pictureId, blob: result })
        : new DownloadThumbnailProgressAction({ pictureId, progress: result })
      ),
      catchError((error: Error) => of(new DownloadThumbnailErrorAction(error))),
      takeUntil(this.downloadErrors$)
    ))
  )

  @Effect()
  readonly saveThumbnail$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_SAVE),
    map(action => action.payload),
    mergeMap(({ pictureId, blob }) => PictureArrayBufferBlob.fromBlob(pictureId, blob).pipe(
      mergeMap(arrayBufferBlob => this.thumbnailsStorage.set(arrayBufferBlob)),
      map(() => new DownloadThumbnailSuccessAction({ pictureId })),
      catchError((error: Error) => of(new DownloadThumbnailErrorAction(error))),
      takeUntil(this.downloadErrors$)
    ))
  )

  @Effect()
  readonly finishDownloadPictures$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_PICTURES),
    map(action => action.payload),
    mergeMap(({ pictureIds }) => this.downloadPictureOrThumbnailSuccess$.pipe(
      bufferCount(pictureIds.length * 2),
      first(),
      takeUntil(this.downloadErrors$)
    )),
    map(() => new DownloadPicturesSuccessAction())
  )

  @Effect()
  readonly finishDownloadAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_ALBUM),
    map(action => action.payload),
    mergeMap(({ album }) => this.actions$.pipe(
      ofType(DownloadAlbumActionsTypes.DOWNLOAD_PICTURES_SUCCESS),
      first(),
      mergeMap(() => this.albumsFinishedStorage.set({ id: album.id, isFinished: true })),
      map(() => new DownloadAlbumSuccessAction()),
      catchError((error: Error) => of(new DownloadAlbumErrorAction(error))),
      takeUntil(this.downloadErrors$)
    )),
  )

  @Effect()
  readonly refreshAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_SUCCESS),
    map(() => new GetOfflineAlbumsAction())
  )

  @Effect()
  readonly refresgStorageEstimate$: Observable<Action> = this.actions$.pipe(
    ofType(
      DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_SUCCESS,
      DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_ERROR,
    ),
    map(() => new GetStorageEstimateAction())
  )

  constructor(
    private readonly actions$: Actions<DownloadAlbumActions>,
    private readonly albumsDao: AlbumsDaoService,
    private readonly albumsStorage: AlbumsStorageService,
    private readonly albumsFinishedStorage: AlbumsFinishedStorageService,
    private readonly picturesStorage: PicturesStorageService,
    private readonly thumbnailsStorage: ThumbnailsStorageService,
  ) {}
}
