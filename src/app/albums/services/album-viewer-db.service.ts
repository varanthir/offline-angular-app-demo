import { Injectable } from '@angular/core'
import { openDB, IDBPDatabase, DBSchema } from 'idb'
import { Album } from '../state/dto/album';

export enum StoreName {
  Albums = 'albums',
  Pictures = 'pictures',
  Thumbnails = 'thumbnails',
}

export interface ArrayBufferBlob {
  arrayBuffer: ArrayBuffer,
  type: string,
}

interface AlbumViewerDb extends DBSchema {
  [StoreName.Albums]: {
    key: number,
    value: Album,
  },
  [StoreName.Pictures]: {
    value: ArrayBufferBlob,
    key: number,
  },
  [StoreName.Thumbnails]: {
    value: ArrayBufferBlob,
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
            db.createObjectStore(StoreName.Pictures)
            db.createObjectStore(StoreName.Thumbnails)
        }
      },
      blocked() {
        console.log(`#idb: Connection to 'album-viewer' db is blocked by older versions of the db opened`)
      },
      blocking() {
        console.log(`#idb: Connection to 'album-viewer' db is blocking a future version of the db from opening`)
      }
    })
  }
}
