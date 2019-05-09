import { Injectable } from '@angular/core'
import { AlbumViewerDbService, StoreName } from './album-viewer-db.service'
import { from, Observable } from 'rxjs'
import { ArrayBufferBlob } from 'utils/rxjs/to-array-buffer-file';

@Injectable()
export class ThumbnailsStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  public get(pictureId: number): Observable<ArrayBufferBlob> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.Thumbnails, pictureId)
      if (album === undefined) {
        throw new Error(`Thumbnail with id: ${pictureId} doesn't exist in IndexedDB`)
      }
      return album
    }))
  }

  public set(pictureId: number, arrayBufferBlob: ArrayBufferBlob): Observable<number> {
    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.Thumbnails, arrayBufferBlob, pictureId)))
  }

  public delete(pictureId: number): Observable<void> {
    return from(this.albumViewerDb.db
      .then(db => db.delete(StoreName.Thumbnails, pictureId)))
  }
}
