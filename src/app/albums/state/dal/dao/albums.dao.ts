import { Injectable } from '@angular/core'
import { HttpClient, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'environments/environment'
import { Album, AlbumObject } from '../dto/album'
import { mapArray } from 'utils/rxjs/map-array'

const getFileWithProgressConfig = {
  observe: 'events' as 'events',
  reportProgress: true,
  responseType: 'blob' as 'blob',
  headers: {
    'ngsw-bypass': 'true' // bypas Angular Service Worker to report request progress, it can have any value
  }
}

@Injectable()
export class AlbumsDaoService {
  private readonly baseUrl = environment.api

  constructor(private readonly http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<AlbumObject[]>(`/${this.baseUrl}/albums`).pipe(
      mapArray(Album.fromObject))
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<AlbumObject>(`/${this.baseUrl}/albums/${id}`).pipe(
      map(Album.fromObject))
  }

  getPictureFile(pictureId: number): Observable<HttpEvent<Blob>> {
    return this.http.get(`/${this.baseUrl}/pictures/${pictureId}`, getFileWithProgressConfig)
  }

  getThumbnailFile(pictureId: number): Observable<HttpEvent<Blob>> {
    return this.http.get(`/${this.baseUrl}/thumbnails/${pictureId}`, getFileWithProgressConfig)
  }
}
