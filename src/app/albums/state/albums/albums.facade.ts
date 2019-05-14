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
  getOfflineFilesState,
} from '../index'
import { GetOfflineAlbumsAction, GetOfflineAlbumAction, DeleteOfflineAlbumAction } from './offline-albums/offline-albums.actions'
import { GetOnlineAlbumsAction, GetOnlineAlbumAction } from './online-albums/online-albums.actions';
import { filter } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Album } from '../dal/dto/album'
import { RevokeOfflineFilesUrlsAction } from './offline-files/offline-files.actions';

@Injectable()
export class AlbumsFacadeService {
  public readonly albums$ = this.store.pipe(select(getAlbums))
  public readonly albumsStatus$ = this.store.pipe(select(getAlbumsStatus))
  public readonly emptyAlbumsPending$ = this.store.pipe(select(getEmptyAlbumsPending))

  public readonly onlineAlbumStatus$ = this.store.pipe(select(getOnlineAlbumStatus))
  public readonly offlineAlbumStatus$ = this.store.pipe(select(getOfflineAlbumStatus))

  public readonly offlineFiles$ = this.store.pipe(select(getOfflineFilesState))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  public getAlbums(): void {
    this.store.dispatch(new GetOnlineAlbumsAction())
    this.store.dispatch(new GetOfflineAlbumsAction())
  }

  public getOnlineAlbum(albumId: number): void {
    this.store.dispatch(new GetOnlineAlbumAction({ albumId }))
  }

  public getOfflineAlbum(albumId: number): void {
    this.store.dispatch(new GetOfflineAlbumAction({ albumId }))
  }

  public deleteOfflineAlbum(albumId: number): void {
    this.store.dispatch(new DeleteOfflineAlbumAction({ albumId }))
  }

  public getOnlineAlbumById$(albumId: number): Observable<Album> {
    return this.store.pipe(select(getOnlineAlbum)).pipe(
      filter<Album>(album => album !== null && album.id === albumId),
    )
  }

  public getOfflineAlbumById$(albumId: number): Observable<Album> {
    return this.store.pipe(select(getOfflineAlbum)).pipe(
      filter<Album>(album => album !== null && album.id === albumId),
    )
  }

  public revokeOfflineFiles(): void {
    this.store.dispatch(new RevokeOfflineFilesUrlsAction())
  }
}
