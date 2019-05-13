import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of, forkJoin } from 'rxjs'
import {
  OfflineFilesActions,
  OfflineFilesActionTypes,
  GetOfflineFilesUrlsSuccessAction,
  GetOfflineFilesUrlsErrorAction,
} from './offline-files.actions'
import { catchError, map, switchMap } from 'rxjs/operators'
import { PicturesStorageService } from '../../dal/dao/pictures.storage';
import { ThumbnailsStorageService } from '../../dal/dao/thumbnails.storage';
import { PictureArrayBufferBlob } from '../../dal/dto/picture-array-buffer-blob';
import { OfflineFileUrl } from '../../dal/dto/offline-file-url';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class OfflineFilesEffects {

  @Effect()
  public readonly getOfflineFiles$: Observable<Action> = this.actions$.pipe(
    ofType(OfflineFilesActionTypes.GET_OFFLINE_FILES),
    map(action => action.payload),
    switchMap(({ pictureIds }) => forkJoin(
      this.picturesStorage.getMany(pictureIds),
      this.thumbnailsStorage.getMany(pictureIds),
    ).pipe(
      map(([pictures, thumbnails]) => ({
        pictures: pictures.map(picture => this.toOfflineFileUrl(picture)),
        thumbnails: thumbnails.map(thumbnail => this.toOfflineFileUrl(thumbnail)),
      })),
      map(payload => new GetOfflineFilesUrlsSuccessAction(payload)),
      catchError((error: Error) => of(new GetOfflineFilesUrlsErrorAction(error)))
    ))
  )

  constructor(
    private readonly actions$: Actions<OfflineFilesActions>,
    private readonly domSanitizer: DomSanitizer,
    private readonly picturesStorage: PicturesStorageService,
    private readonly thumbnailsStorage: ThumbnailsStorageService,
  ) {}

  private toOfflineFileUrl({ id, arrayBuffer, type}: PictureArrayBufferBlob): OfflineFileUrl {
    const url = URL.createObjectURL(new Blob([arrayBuffer], { type }))
    const safeUrl = this.domSanitizer.bypassSecurityTrustUrl(url)

    return new OfflineFileUrl(id, url, safeUrl)
  }
}