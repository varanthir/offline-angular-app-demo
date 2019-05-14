import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { first, switchMap, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { isPending, isError } from 'utils/ngrx/action-status'
import { OfflineAlbumViewerParams } from './offline-album-viewer-params'
import { AlbumsFacadeService } from '../state/albums/albums.facade'

@Component({
  selector: 'app-offline-album-viewer',
  templateUrl: './offline-album-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineAlbumViewerComponent implements OnDestroy {
  public readonly isAlbumPending$ = this.albumsFacade.offlineAlbumStatus$.pipe(map(isPending))
  public readonly isAlbumError$ = this.albumsFacade.offlineAlbumStatus$.pipe(map(isError))
  public readonly params = new OfflineAlbumViewerParams(this.router)
  public readonly album$ = this.params.albumId$.pipe(
    switchMap(albumId => this.albumsFacade.getOfflineAlbumById$(albumId)))

  private readonly getAlbumSub: Subscription = this.params.albumId$
    .subscribe(albumId => this.albumsFacade.getOfflineAlbum(albumId))

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly router: ActivatedRoute,
  ) {}

  public ngOnDestroy(): void {
    this.getAlbumSub.unsubscribe()
    this.albumsFacade.revokeOfflineFiles()
  }

  public getAlbum(): void {
    this.params.albumId$
      .pipe(first())
      .subscribe(albumId => this.albumsFacade.getOfflineAlbum(albumId))
  }
}
