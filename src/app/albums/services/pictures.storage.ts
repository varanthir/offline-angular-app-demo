import { Injectable } from '@angular/core'
import { AlbumViewerDbService, StoreName } from './album-viewer-db.service'
import { from, Observable } from 'rxjs'
import { ArrayBufferBlob } from 'utils/rxjs/to-array-buffer-file';

@Injectable()
export class PicturesStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  public get(pictureId: number): Observable<ArrayBufferBlob> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.Pictures, pictureId)
      if (album === undefined) {
        throw new Error(`Picture with id: ${pictureId} doesn't exist in IndexedDB`)
      }
      return album
    }))
  }

  public set(pictureId: number, arrayBufferBlob: ArrayBufferBlob): Observable<number> {
    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.Pictures, arrayBufferBlob, pictureId)))
  }

  public delete(pictureId: number): Observable<void> {
    return from(this.albumViewerDb.db
      .then(db => db.delete(StoreName.Pictures, pictureId)))
  }
}
