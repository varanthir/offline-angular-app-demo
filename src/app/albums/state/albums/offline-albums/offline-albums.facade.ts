import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import {
  AlbumsAppState,
  getAlbum,
  getAlbums,
  getAlbumsStatus,
  getAlbumStatus,
  getEmptyAlbumsPending,
} from '../../index'
import { GetOfflineAlbumsAction, GetOfflineAlbumAction } from './offline-albums.actions'
import { filter } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Album } from '../../dal/dto/album'

@Injectable()
export class OfflineAlbumsFacadeService {
  public readonly albums$ = this.store.pipe(select(getAlbums))
  public readonly albumsStatus$ = this.store.pipe(select(getAlbumsStatus))
  public readonly emptyAlbumsPending$ = this.store.pipe(select(getEmptyAlbumsPending))
  public readonly albumStatus$ = this.store.pipe(select(getAlbumStatus))

  constructor(private readonly store: Store<AlbumsAppState>) {}

  public getAlbums(): void {
    this.store.dispatch(new GetOfflineAlbumsAction())
  }

  public getAlbum(albumId: number): void {
    this.store.dispatch(new GetOfflineAlbumAction({ albumId }))
  }

  public albumById$(albumId: number): Observable<Album> {
    return this.store.pipe(select(getAlbum)).pipe(
      filter<Album>(album => album !== null && album.id === albumId),
    )
  }
}
