import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import {
  AlbumsAppState, getDownloadAlbumStatus, getDownloadAlbumProgress, getDownloadAlbumEntity,
} from '../index'
import { DownloadAlbumAction, DownloadAlbumCancelAction, DownloadAlbumClearAction } from './download-album.actions'
import { Album } from '../dal/dto/album'

@Injectable()
export class DownloadAlbumFacadeService {
  readonly downloadAlbumStatus$ = this.store.pipe(select(getDownloadAlbumStatus))
  readonly downloadAlbumProgress$ = this.store.pipe(select(getDownloadAlbumProgress))
  readonly downloadAlbumEntity$ = this.store.pipe(select(getDownloadAlbumEntity))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  downloadAlbum(album: Album): void {
    this.store.dispatch(new DownloadAlbumAction({ album }))
  }

  downloadCancel(): void {
    this.store.dispatch(new DownloadAlbumCancelAction())
  }

  downloadClear(): void {
    this.store.dispatch(new DownloadAlbumClearAction())
  }
}
