import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import {
  AlbumsAppState, getDownloadAlbumStatus, getDownloadAlbumProgress, getDownloadAlbumEntity,
} from '../index'
import { DownloadAlbumAction, DownloadAlbumCancelAction, DownloadAlbumClearAction } from './download-album.actions';
import { Album } from '../albums/dto/album';

@Injectable()
export class DownloadAlbumFacadeService {
  public readonly downloadAlbumStatus$ = this.store.pipe(select(getDownloadAlbumStatus))
  public readonly downloadAlbumProgress$ = this.store.pipe(select(getDownloadAlbumProgress))
  public readonly downloadAlbumEntity$ = this.store.pipe(select(getDownloadAlbumEntity))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  public downloadAlbum(album: Album): void {
    this.store.dispatch(new DownloadAlbumAction({ album }))
  }

  public downloadCancel(): void {
    this.store.dispatch(new DownloadAlbumCancelAction())
  }

  public downloadClear(): void {
    this.store.dispatch(new DownloadAlbumClearAction())
  }
}
