import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import {
  AlbumsAppState,
  getAlbumsStatus,
  getEmptyAlbumsPending,
  getOnlineAlbumStatus,
  getOfflineAlbumStatus,
  getOfflineAlbum,
  getAlbums,
  getOnlineAlbum,
  getOfflineFiles,
  getOfflineFilesEntities,
} from '../index'
import { GetOfflineAlbumsAction, GetOfflineAlbumAction, DeleteOfflineAlbumAction } from './offline-albums/offline-albums.actions'
import { GetOnlineAlbumsAction, GetOnlineAlbumAction } from './online-albums/online-albums.actions';
import { filter } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Album } from '../dal/dto/album'
import { RevokeOfflineFilesUrlsAction } from './offline-files/offline-files.actions';

@Injectable()
export class AlbumsFacadeService {
  readonly albums$ = this.store.pipe(select(getAlbums))
  readonly albumsStatus$ = this.store.pipe(select(getAlbumsStatus))
  readonly emptyAlbumsPending$ = this.store.pipe(select(getEmptyAlbumsPending))

  readonly onlineAlbumStatus$ = this.store.pipe(select(getOnlineAlbumStatus))
  readonly offlineAlbumStatus$ = this.store.pipe(select(getOfflineAlbumStatus))

  readonly offlineFiles$ = this.store.pipe(select(getOfflineFiles))
  readonly offlineFilesEntities$ = this.store.pipe(select(getOfflineFilesEntities))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  getAlbums(): void {
    this.store.dispatch(new GetOnlineAlbumsAction())
    this.store.dispatch(new GetOfflineAlbumsAction())
  }

  getOnlineAlbum(albumId: number): void {
    this.store.dispatch(new GetOnlineAlbumAction({ albumId }))
  }

  getOfflineAlbum(albumId: number): void {
    this.store.dispatch(new GetOfflineAlbumAction({ albumId }))
  }

  deleteOfflineAlbum(albumId: number): void {
    this.store.dispatch(new DeleteOfflineAlbumAction({ albumId }))
  }

  getOnlineAlbumById$(albumId: number): Observable<Album> {
    return this.store.pipe(select(getOnlineAlbum)).pipe(
      filter<Album>(album => album !== null && album.id === albumId),
    )
  }

  getOfflineAlbumById$(albumId: number): Observable<Album> {
    return this.store.pipe(select(getOfflineAlbum)).pipe(
      filter<Album>(album => album !== null && album.id === albumId),
    )
  }

  revokeOfflineFiles(): void {
    this.store.dispatch(new RevokeOfflineFilesUrlsAction())
  }
}
