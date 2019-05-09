import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import {
  AlbumsActions,
  AlbumsActionsTypes,
  GetAlbumsSuccessAction,
  GetAlbumsErrorAction,
  GetAlbumSuccessAction,
  GetAlbumErrorAction,
} from './albums.actions'
import { AlbumsDaoService } from './albums.dao'
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable()
export class AlbumsEffects {

  @Effect()
  public readonly getAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActionsTypes.GET_ALBUMS),
    switchMap(() => this.albumsDao.getAlbums().pipe(
      map(albums => new GetAlbumsSuccessAction({ albums })),
      catchError((error: Error) => of(new GetAlbumsErrorAction(error)))
    ))
  )

  @Effect()
  public readonly getAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActionsTypes.GET_ALBUM),
    map(action => action.payload),
    switchMap(({ albumId }) => this.albumsDao.getAlbum(albumId).pipe(
      map(album => new GetAlbumSuccessAction({ album })),
      catchError((error: Error) => of(new GetAlbumErrorAction(error)))
    ))
  )

  constructor(
    private readonly actions$: Actions<AlbumsActions>,
    private readonly albumsDao: AlbumsDaoService,
  ) {}
}
