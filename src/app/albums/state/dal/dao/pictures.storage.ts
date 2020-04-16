import { Injectable } from '@angular/core'
import { AlbumViewerDbService, StoreName } from './album-viewer-db.service'
import { from, Observable } from 'rxjs'
import { PictureArrayBufferBlob } from '../dto/picture-array-buffer-blob';

@Injectable()
export class PicturesStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  get(pictureId: number): Observable<PictureArrayBufferBlob> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.Pictures, pictureId)
      if (album === undefined) {
        throw new Error(`Picture with id: ${pictureId} doesn't exist in IndexedDB`)
      }
      return PictureArrayBufferBlob.fromObject(album)
    }))
  }

  getMany(pictureIds: number[]): Observable<PictureArrayBufferBlob[]> {
    return from(this.albumViewerDb.db.then(async db => {
      const pictureArrayBufferBlobs = await db.getAll(StoreName.Pictures) // TODO: Don't get all
      const filteredPictureArrayBufferBlobs = pictureArrayBufferBlobs
        .filter(pictureArrayBufferBlob => pictureIds.some(pictureId => pictureArrayBufferBlob.id === pictureId))

      if (pictureIds.length !== filteredPictureArrayBufferBlobs.length) {
        throw new Error(`Can't find all pictures with specified ids in IndexedDB`)
      }

      return filteredPictureArrayBufferBlobs.map(PictureArrayBufferBlob.fromObject)
    }))
  }

  set(arrayBufferBlob: PictureArrayBufferBlob): Observable<number> {
    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.Pictures, arrayBufferBlob)))
  }

  delete(pictureId: number): Observable<void> {
    return from(this.albumViewerDb.db
      .then(db => db.delete(StoreName.Pictures, pictureId)))
  }
}
