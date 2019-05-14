import { Injectable } from '@angular/core'
import { AlbumsFacadeService } from '../state/albums/albums.facade'
import { map } from 'rxjs/operators';

@Injectable()
export class OfflineFilesUrlsService {
  public readonly getPictureUrlFn$ = this.albumsFacade.offlineFilesEntities$.pipe(
    map(offlineFiles => offlineFiles.pictures),
    map(pictures => (pictureId: number) => {
        const picture = pictures[pictureId]
        return picture
          ? picture.safeUrl
          : '/assets/image-placeholder.svg'
      }
    )
  )

  public readonly getThumbnailsUrlFn$ = this.albumsFacade.offlineFilesEntities$.pipe(
    map(offlineFiles => offlineFiles.thumbnails),
    map(thumbnails => (pictureId: number) => {
        const thumbnail = thumbnails[pictureId]
        return thumbnail
          ? thumbnail.safeUrl
          : '/assets/image-placeholder.svg'
      }
    )
  )

  constructor(private readonly albumsFacade: AlbumsFacadeService) {}
}
