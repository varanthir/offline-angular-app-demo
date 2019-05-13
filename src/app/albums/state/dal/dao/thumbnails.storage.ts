import { Injectable } from '@angular/core'
import { AlbumViewerDbService, StoreName } from './album-viewer-db.service'
import { from, Observable } from 'rxjs'
import { PictureArrayBufferBlob } from '../dto/picture-array-buffer-blob'

@Injectable()
export class ThumbnailsStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  public get(pictureId: number): Observable<PictureArrayBufferBlob> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.Thumbnails, pictureId)
      if (album === undefined) {
        throw new Error(`Thumbnail with id: ${pictureId} doesn't exist in IndexedDB`)
      }
      return album
    }))
  }

  public getMany(pictureIds: number[]): Observable<PictureArrayBufferBlob[]> {
    return from(this.albumViewerDb.db.then(async db => {
      const pictureArrayBufferBlobs = await db.getAll(StoreName.Thumbnails) // TODO: Don't get all
      const filteredPictureArrayBufferBlobs = pictureArrayBufferBlobs
        .filter(pictureArrayBufferBlob => pictureIds.some(pictureId => pictureArrayBufferBlob.id === pictureId))

      if (pictureIds.length !== filteredPictureArrayBufferBlobs.length) {
        throw new Error(`Can't find all thumbnails with specified ids in IndexedDB`)
      }

      return filteredPictureArrayBufferBlobs
    }))
  }

  public set(pictureId: number, arrayBufferBlob: PictureArrayBufferBlob): Observable<number> {
    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.Thumbnails, arrayBufferBlob, pictureId)))
  }

  public delete(pictureId: number): Observable<void> {
    return from(this.albumViewerDb.db
      .then(db => db.delete(StoreName.Thumbnails, pictureId)))
  }
}
