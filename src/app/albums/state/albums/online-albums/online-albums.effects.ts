import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import {
  OnlineAlbumsActionTypes,
  GetOnlineAlbumsSuccessAction,
  GetOnlineAlbumsErrorAction,
  OnlineAlbumsActions,
  GetOnlineAlbumSuccessAction,
  GetOnlineAlbumErrorAction,
} from './online-albums.actions'
import { catchError, map, switchMap } from 'rxjs/operators'
import { AlbumsDaoService } from '../../dal/dao/albums.dao';

@Injectable()
export class OnlineAlbumsEffects {

  @Effect()
  readonly getAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS),
    switchMap(() => this.albumsDao.getAlbums().pipe(
      map(albums => new GetOnlineAlbumsSuccessAction({ albums })),
      catchError((error: Error) => of(new GetOnlineAlbumsErrorAction(error)))
    ))
  )

  @Effect()
  readonly getAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(OnlineAlbumsActionTypes.GET_ONLINE_ALBUM),
    map(action => action.payload),
    switchMap(({ albumId }) => this.albumsDao.getAlbum(albumId).pipe(
      map(album => new GetOnlineAlbumSuccessAction({ album })),
      catchError((error: Error) => of(new GetOnlineAlbumErrorAction(error)))
    ))
  )

  constructor(
    private readonly actions$: Actions<OnlineAlbumsActions>,
    private readonly albumsDao: AlbumsDaoService,
  ) {}
}
