import { Injectable } from '@angular/core'
import { AlbumViewerDbService, StoreName, AlbumFinished } from './album-viewer-db.service'
import { from, Observable } from 'rxjs'

@Injectable()
export class AlbumsFinishedStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  public getAll(): Observable<AlbumFinished[]> {
    return from(this.albumViewerDb.db
      .then(db => db.getAll(StoreName.AlbumsFinished)))
  }

  public get(albumId: number): Observable<AlbumFinished> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.AlbumsFinished, albumId)
      if (album === undefined) {
        throw new Error(`AlbumFinished with id: ${albumId} doesn't exist in IndexedDB`)
      }
      return album
    }))
  }

  public set(albumFinished: AlbumFinished): Observable<number> {
    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.AlbumsFinished, albumFinished)))
  }

  public delete(albumId: number): Observable<void> {
    return from(this.albumViewerDb.db
      .then(db => db.delete(StoreName.AlbumsFinished, albumId)))
  }
}
