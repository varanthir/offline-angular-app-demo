import { Injectable } from '@angular/core'
import { openDB, IDBPDatabase, DBSchema } from 'idb'
import { ArrayBufferBlob } from 'utils/rxjs/to-array-buffer-blob'
import { Album } from '../dto/album'
import { PictureArrayBufferBlob } from '../dto/picture-array-buffer-blob';

export enum StoreName {
  Albums = 'albums',
  AlbumsFinished = 'albums-finished',
  Pictures = 'pictures',
  Thumbnails = 'thumbnails',
}

export enum Mode {
  ReadWrite = 'readwrite',
  ReadOnly = 'readonly',
}

export interface AlbumFinished {
  id: number,
  isFinished: boolean,
}

interface AlbumViewerDb extends DBSchema {
  [StoreName.Albums]: {
    key: number,
    value: Album,
  },
  [StoreName.AlbumsFinished]: {
    value: AlbumFinished,
    key: number,
  },
  [StoreName.Pictures]: {
    value: PictureArrayBufferBlob,
    key: number,
  },
  [StoreName.Thumbnails]: {
    value: PictureArrayBufferBlob,
    key: number,
  },
}

@Injectable()
export class AlbumViewerDbService {
  private _db: Promise<IDBPDatabase<AlbumViewerDb>> | null = null

  public get db(): Promise<IDBPDatabase<AlbumViewerDb>> {
    if (this._db) {
      return this._db
    }

    this._db = this.getDB()
    return this._db
  }

  private getDB(): Promise<IDBPDatabase<AlbumViewerDb>> {
    return openDB<AlbumViewerDb>('album-viewer', 1, {
      upgrade(db, oldVersion /*, newVersion, transaction*/) {
        switch (oldVersion) {
          case 0:
            db.createObjectStore(StoreName.Albums, { keyPath: 'id' })
            db.createObjectStore(StoreName.AlbumsFinished, { keyPath: 'id' })
            db.createObjectStore(StoreName.Pictures)
            db.createObjectStore(StoreName.Thumbnails)
        }
      },
      blocked() {
        console.warn(`#idb: Connection to 'album-viewer' db is blocked by older versions of the db opened`)
      },
      blocking() {
        console.warn(`#idb: Connection to 'album-viewer' db is blocking a future version of the db from opening`)
      }
    })
  }
}
