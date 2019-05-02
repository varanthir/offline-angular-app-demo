import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import {
  AlbumsActions,
  GetAlbumsSuccessAction,
  GetAlbumsErrorAction,
  GetAlbumAction,
  GetAlbumSuccessAction,
  GetAlbumErrorAction,
} from './actions'
import { AlbumsDaoService } from './dao.service'
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable()
export class AlbumsEffects {

  @Effect()
  public readonly getAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActions.GET_ALBUMS),
    switchMap(() => this.albumsDao.getAlbums().pipe(
      map(albums => new GetAlbumsSuccessAction({ albums })),
      catchError((error: Error) => of(new GetAlbumsErrorAction(error)))
    ))
  )

  @Effect()
  public readonly getAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActions.GET_ALBUM),
    map(({ payload }: GetAlbumAction) => payload),
    switchMap(({ albumId }) => this.albumsDao.getAlbum(albumId).pipe(
      map(album => new GetAlbumSuccessAction({ album })),
      catchError((error: Error) => of(new GetAlbumErrorAction(error)))
    ))
  )

  constructor(
    private readonly actions$: Actions,
    private readonly albumsDao: AlbumsDaoService,
  ) {}
}
