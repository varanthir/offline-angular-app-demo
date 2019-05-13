import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { first, switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { mapIsPending, mapIsError } from 'utils/ngrx/action-status'
import { OnlineAlbumViewerParams } from './online-album-viewer-params'
import { AlbumsFacadeService } from '../state/albums/albums.facade'

@Component({
  selector: 'app-online-album-viewer',
  templateUrl: './online-album-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlineAlbumViewerComponent implements OnDestroy {
  public readonly isAlbumPending$ = this.albumsFacade.onlineAlbumStatus$.pipe(mapIsPending)
  public readonly isAlbumError$ = this.albumsFacade.onlineAlbumStatus$.pipe(mapIsError)
  public readonly params = new OnlineAlbumViewerParams(this.router)
  public readonly album$ = this.params.albumId$.pipe(
    switchMap(albumId => this.albumsFacade.getOnlineAlbumById$(albumId)))

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
