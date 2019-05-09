import { Injectable } from '@angular/core'
// import { openDB, IDBPDatabase } from 'idb'
import { openDB, IDBPDatabase } from 'idb/with-async-ittr.js'

@Injectable()
export class OfflineDbService {
  private _db: Promise<IDBPDatabase> | null = null

  public get db(): Promise<IDBPDatabase> {
    if (this._db) {
      return this._db
    }

    this._db = this.getDB()
    return this._db
  }

  private getDB(): Promise<IDBPDatabase> {
    return openDB('album-viewer', 1, {
      upgrade(db, oldVersion /*, newVersion, transaction*/) {
        switch (oldVersion) {
          case 0:
            db.createObjectStore('albums', { keyPath: 'id' })
            db.createObjectStore('pictures')
            db.createObjectStore('thumbnails')
        }
      },
      blocked() {
        console.log(`#idb: Connection to 'album-viewer' db is blocked`)
      },
      blocking() {
        console.log(`#idb: Connection to 'album-viewer' db is blocking`)
      }
    })
  }
}
