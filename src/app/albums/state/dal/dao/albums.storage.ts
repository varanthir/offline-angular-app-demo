import { Injectable } from '@angular/core'
import { from, Observable } from 'rxjs'
import { AlbumViewerDbService, StoreName } from './album-viewer-db.service'
import { Album } from '../dto/album'

@Injectable()
export class AlbumsStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  public getAll(): Observable<Album[]> {
    return from(this.albumViewerDb.db
      .then(db => db.getAll(StoreName.Albums)))
  }

  public get(albumId: number): Observable<Album> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.Albums, albumId)
      if (album === undefined) {
        throw new Error(`Album with id: ${albumId} doesn't exist in IndexedDB`)
      }
      return album
    }))
  }

  public set(album: Album): Observable<number> {
    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.Albums, album)))
  }

  public delete(albumId: number): Observable<void> {
    return from(this.albumViewerDb.db
      .then(db => db.delete(StoreName.Albums, albumId)))
  }
}
