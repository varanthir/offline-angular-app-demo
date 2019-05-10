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
}

@Injectable()
export class AlbumsDaoService {
  private readonly baseUrl = environment.api

  constructor(private readonly http: HttpClient) {}

  public getAlbums(): Observable<Album[]> {
    return this.http.get<AlbumObject[]>(`/${this.baseUrl}/albums`).pipe(
      mapArray(Album.fromObject))
  }

  public getAlbum(id: number): Observable<Album> {
    return this.http.get<AlbumObject>(`/${this.baseUrl}/albums/${id}`).pipe(
      map(Album.fromObject))
  }

  public getPictureFile(pictureId: number): Observable<HttpEvent<Blob>> {
    return this.http.get(`/${this.baseUrl}/pictures/${pictureId}`, getFileWithProgressConfig)
  }

  public getThumbnailFile(pictureId: number): Observable<HttpEvent<Blob>> {
    return this.http.get(`/${this.baseUrl}/thumbnails/${pictureId}`, getFileWithProgressConfig)
  }
}
