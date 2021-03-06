import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of, forkJoin } from 'rxjs'
import {
  OfflineAlbumsActionTypes,
  GetOfflineAlbumsSuccessAction,
  GetOfflineAlbumsErrorAction,
  OfflineAlbumsActions,
  GetOfflineAlbumSuccessAction,
  GetOfflineAlbumErrorAction,
  DeleteOfflineAlbumSuccessAction,
  DeleteOfflineAlbumErrorAction,
  GetOfflineAlbumsAction,
} from './offline-albums.actions'
import { catchError, map, switchMap } from 'rxjs/operators'
import { AlbumsStorageService } from '../../dal/dao/albums.storage'
import { GetOfflineFilesUrlsAction } from '../offline-files/offline-files.actions';
import { GetStorageEstimateAction } from '../../storage-estimate/storage-estimate.actions';
import { AlbumsFinishedStorageService } from '../../dal/dao/albums-finished.storage'
import { AlbumFinished } from '../../dal/dao/album-viewer-db.service'
import { Album } from '../../dal/dto/album'

const finishedAlbums = ([albumsFinished, albums]: [AlbumFinished[], Album[]]) => {
  const filteredIds = albumsFinished
    .filter(({ isFinished }) => isFinished)
    .map(({ id }) => id)

  return albums.filter(album => filteredIds.includes(album.id))
}

@Injectable()
export class OfflineAlbumsEffects {

  @Effect()
  readonly getAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS),
    switchMap(() => forkJoin([
      this.albumsFinishedStorage.getAll(),
      this.albumsStorage.getAll()
    ]).pipe(
        map(finishedAlbums),
        map(albums => new GetOfflineAlbumsSuccessAction({ albums })),
        catchError((error: Error) => of(new GetOfflineAlbumsErrorAction(error)))
      )
    )
  )

  @Effect()
  readonly getAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM),
    map(action => action.payload),
    switchMap(({ albumId }) => this.albumsStorage.get(albumId).pipe(
      map(album => new GetOfflineAlbumSuccessAction({ album })),
      catchError((error: Error) => of(new GetOfflineAlbumErrorAction(error)))
    ))
  )

  @Effect()
  readonly deleteOfflineAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM),
    map(action => action.payload),
    switchMap(({ albumId }) => this.albumsStorage.deleteWhole(albumId).pipe(
      map(() => new DeleteOfflineAlbumSuccessAction()),
      catchError((error: Error) => of(new DeleteOfflineAlbumErrorAction(error)))
    ))
  )

  @Effect()
  readonly refreshAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM_SUCCESS),
    map(() => new GetOfflineAlbumsAction())
  )

  @Effect()
  readonly getOfflineFiles$: Observable<Action> = this.actions$.pipe(
    ofType(OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM_SUCCESS),
    map(action => action.payload.album.pictures.map(({ id }) => id)),
    map(pictureIds => new GetOfflineFilesUrlsAction({ pictureIds }))
  )

  @Effect()
  readonly refresgStorageEstimate$: Observable<Action> = this.actions$.pipe(
    ofType(
      OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM_SUCCESS,
      OfflineAlbumsActionTypes.DELETE_OFFLINE_ALBUM_ERROR,
    ),
    map(() => new GetStorageEstimateAction())
  )

  constructor(
    private readonly actions$: Actions<OfflineAlbumsActions>,
    private readonly albumsStorage: AlbumsStorageService,
    private readonly albumsFinishedStorage: AlbumsFinishedStorageService,
  ) {}
}
