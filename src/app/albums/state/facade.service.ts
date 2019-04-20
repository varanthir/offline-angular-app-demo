import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AlbumsFeatureState, getAlbums } from './selectors';
import { GetAlbumsAction } from './actions';


@Injectable()
export class AlbumsFacadeService {
  public readonly albums$ = this.store.pipe(select(getAlbums))

  constructor(private readonly store: Store<AlbumsFeatureState>) {}

  public getAlbums(): void {
    this.store.dispatch(new GetAlbumsAction())
  }
}