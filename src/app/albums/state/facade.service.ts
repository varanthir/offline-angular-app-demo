import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AlbumsAppState, getAlbums, getEmptyAlbumsPending, getAlbumsStatus } from './selectors';
import { GetAlbumsAction } from './actions';


@Injectable()
export class AlbumsFacadeService {
  public readonly albums$ = this.store.pipe(select(getAlbums))
  public readonly albumsStatus$ = this.store.pipe(select(getAlbumsStatus))
  public readonly emptyAlbumsPending$ = this.store.pipe(select(getEmptyAlbumsPending))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  public getAlbums(): void {
    this.store.dispatch(new GetAlbumsAction())
  }
}
