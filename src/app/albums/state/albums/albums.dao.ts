import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'environments/environment'
import { Album, AlbumObject } from './dto/album'
import { mapArray } from 'utils/rxjs/map-array'

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
}
