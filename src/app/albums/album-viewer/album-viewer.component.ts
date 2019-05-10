import { Component, OnDestroy, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AlbumsFacadeService } from '../state/albums/albums.facade'
import { first, switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { mapIsPending, mapIsError } from 'utils/ngrx/action-status'
import { Picture } from '../state/albums/dto/picture'
import { AlbumViewerParams } from './album-viewer-params'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { CdkPortal } from '@angular/cdk/portal'

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss']
})
export class AlbumViewerComponent implements OnDestroy {
  @ViewChild(CdkPortal) private readonly cdkPortal: CdkPortal
  private overlayRef: OverlayRef | null = null
  public selectedPictureIndex: number | null = null

  public readonly isAlbumPending$ = this.albumsFacade.albumStatus$.pipe(mapIsPending)
  public readonly isAlbumError$ = this.albumsFacade.albumStatus$.pipe(mapIsError)
  public readonly params = new AlbumViewerParams(this.router)
  public readonly album$ = this.params.albumId$.pipe(
    switchMap(albumId => this.albumsFacade.albumById$(albumId)))

  private readonly getAlbumSub: Subscription = this.params.albumId$
    .subscribe(albumId => this.albumsFacade.getAlbum(albumId))

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly router: ActivatedRoute,
    private readonly overlay: Overlay,
  ) {}

  public ngOnDestroy(): void {
    this.getAlbumSub.unsubscribe()
  }

  public getAlbum(): void {
    this.params.albumId$
      .pipe(first())
      .subscribe(albumId => this.albumsFacade.getAlbum(albumId))
  }

  public trackById(index: number, picture: Picture) {
    return picture.id
  }

  public showPictureViewer(pictureIndex: number): void {
    this.hidePictureViewer()

    this.overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      hasBackdrop: true,
    })
    this.overlayRef.attach(this.cdkPortal)
    this.selectedPictureIndex = pictureIndex
  }

  public hidePictureViewer(): void {
    if (this.overlayRef) {
      this.overlayRef.detach()
      this.overlayRef.dispose()
      this.overlayRef = null
      this.selectedPictureIndex = null
    }
  }
}
