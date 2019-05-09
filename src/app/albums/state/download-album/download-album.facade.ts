import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  AlbumsAppState,
} from '../index'
import { DownloadAlbumAction } from './download-album.actions';
import { Album } from '../albums/dto/album';

@Injectable()
export class DownloadAlbumFacadeService {
  constructor(private readonly store: Store<AlbumsAppState>) {}

  public downloadAlbum(album: Album): void {
    this.store.dispatch(new DownloadAlbumAction({ album }))
  }
}
