import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { first, switchMap, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { isPending, isError } from 'utils/ngrx/action-status'
import { OfflineAlbumViewerParams } from './offline-album-viewer-params'
import { AlbumsFacadeService } from '../state/albums/albums.facade'
import { OfflineFilesUrlsService } from '../services/offline-files-urls.service'
import { ContentScrollService } from 'app/services/content-scroll.service'

@Component({
  selector: 'app-offline-album-viewer',
  templateUrl: './offline-album-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineAlbumViewerComponent implements OnInit, OnDestroy {
  readonly isAlbumPending$ = this.albumsFacade.offlineAlbumStatus$.pipe(map(isPending))
  readonly isAlbumError$ = this.albumsFacade.offlineAlbumStatus$.pipe(map(isError))
  readonly params = new OfflineAlbumViewerParams(this.router)
  readonly album$ = this.params.albumId$.pipe(
    switchMap(albumId => this.albumsFacade.getOfflineAlbumById$(albumId)))

  readonly getPictureUrlFn$ = this.offlineFilesUrls.getPictureUrlFn$
  readonly getThumbnailUrlFn$ = this.offlineFilesUrls.getThumbnailsUrlFn$

  private readonly getAlbumSub: Subscription = this.params.albumId$
    .subscribe(albumId => this.albumsFacade.getOfflineAlbum(albumId))

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly offlineFilesUrls: OfflineFilesUrlsService,
    private readonly router: ActivatedRoute,
    private readonly contentScroll: ContentScrollService,
  ) {}

  ngOnInit(): void {
    this.contentScroll.scrollTop()
  }

  ngOnDestroy(): void {
    this.getAlbumSub.unsubscribe()
    this.albumsFacade.revokeOfflineFiles()
  }

  getAlbum(): void {
    this.params.albumId$
      .pipe(first())
      .subscribe(albumId => this.albumsFacade.getOfflineAlbum(albumId))
  }
}
