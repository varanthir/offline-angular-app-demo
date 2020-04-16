import { Injectable } from '@angular/core'
import { from, Observable } from 'rxjs'
import { AlbumViewerDbService, StoreName, Mode } from './album-viewer-db.service'
import { Album } from '../dto/album'
import difference from 'lodash.difference'

@Injectable()
export class AlbumsStorageService {
  constructor(private readonly albumViewerDb: AlbumViewerDbService) {}

  getAll(): Observable<Album[]> {
    return from(this.albumViewerDb.db
      .then(db => db.getAll(StoreName.Albums)))
  }

  get(albumId: number): Observable<Album> {
    return from(this.albumViewerDb.db.then(async db => {
      const album = await db.get(StoreName.Albums, albumId)
      if (album === undefined) {
        throw new Error(`Album with id: ${albumId} doesn't exist in IndexedDB`)
      }
      return album
    }))
  }

  set(album: Album): Observable<number> {
    const offlineAlbum = Album.fromObject({ ...album, isOffline: true })

    return from(this.albumViewerDb.db
      .then(db => db.put(StoreName.Albums, offlineAlbum)))
  }

  deleteWhole(albumId: number): Observable<void> {
    return from(this.albumViewerDb.db.then(async db => {
      const tx = db.transaction([StoreName.Albums, StoreName.AlbumsFinished, StoreName.Pictures, StoreName.Thumbnails], Mode.ReadWrite)
      const albumsStore = tx.objectStore(StoreName.Albums)
      const albumsFinishedStore = tx.objectStore(StoreName.AlbumsFinished)
      const picturesStore = tx.objectStore(StoreName.Pictures)
      const thumbnailsStore = tx.objectStore(StoreName.Thumbnails)

      const album = await albumsStore.get(albumId)
      if (!album) {
        return tx.abort()
      }
      const albums = await albumsStore.getAll()
      this.pictureIdsToDelete(album, albums.filter(a => a.id !== albumId))
        .forEach(pictureId => {
          picturesStore.delete(pictureId)
          thumbnailsStore.delete(pictureId)
        })

      albumsStore.delete(albumId)
      albumsFinishedStore.delete(albumId)

      return tx.done
    }))
  }

  private pictureIdsToDelete(albumToDelete: Album, albumsToKeep: Album[]): number[] {
    const pictureIdsToDelete = albumToDelete.pictures.map(picture => picture.id)
    const pictureIdsToKeep = albumsToKeep
      .map(albumToKeep => albumToKeep.pictures.map(picture => picture.id))
      .reduce((acc, curr) => [...acc, ...curr], [])

    return difference(
      pictureIdsToDelete,
      Array.from(new Set(pictureIdsToKeep)),
    )
  }
}
