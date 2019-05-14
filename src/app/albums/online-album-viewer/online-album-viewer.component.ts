import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { first, switchMap, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { isPending, isError } from 'utils/ngrx/action-status'
import { OnlineAlbumViewerParams } from './online-album-viewer-params'
import { AlbumsFacadeService } from '../state/albums/albums.facade'

@Component({
  selector: 'app-online-album-viewer',
  templateUrl: './online-album-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlineAlbumViewerComponent implements OnDestroy {
  public readonly isAlbumPending$ = this.albumsFacade.onlineAlbumStatus$.pipe(map(isPending))
  public readonly isAlbumError$ = this.albumsFacade.onlineAlbumStatus$.pipe(map(isError))
  public readonly params = new OnlineAlbumViewerParams(this.router)
  public readonly album$ = this.params.albumId$.pipe(
    switchMap(albumId => this.albumsFacade.getOnlineAlbumById$(albumId)))

  public readonly getPictureUrlFn = (pictureId: number | null) => pictureId
    ? `/api/pictures/${pictureId}`
    : '/assets/image-placeholder.svg'
  
  public readonly getThumbnailUrlFn = (pictureId: number | null) => pictureId
    ? `/api/thumbnails/${pictureId}`
    : '/assets/image-placeholder.svg'

  private readonly getAlbumSub: Subscription = this.params.albumId$
    .subscribe(albumId => this.albumsFacade.getOnlineAlbum(albumId))

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly router: ActivatedRoute,
  ) {}

  public ngOnDestroy(): void {
    this.getAlbumSub.unsubscribe()
  }

  public getAlbum(): void {
    this.params.albumId$
      .pipe(first())
      .subscribe(albumId => this.albumsFacade.getOnlineAlbum(albumId))
  }
}
