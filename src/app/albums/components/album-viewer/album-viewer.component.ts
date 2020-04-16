import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { CdkPortal } from '@angular/cdk/portal'
import { Album } from 'app/albums/state/dal/dto/album';
import { Picture } from 'app/albums/state/dal/dto/picture';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumViewerComponent {
  @Input() album: Album | null = null
  @Input() isPending = false
  @Input() isError = false
  @Input() getPictureUrlFn: (pictureId: number | null) => SafeUrl | string
  @Input() getThumbnailUrlFn: (pictureId: number | null) => SafeUrl | string

  @Output() readonly tryAgain = new EventEmitter<void>()

  @ViewChild(CdkPortal, { static: true }) private readonly cdkPortal: CdkPortal

  private overlayRef: OverlayRef | null = null
  selectedPictureIndex: number | null = null

  constructor(private readonly overlay: Overlay) {}

  trackById(index: number, picture: Picture) {
    return picture.id
  }

  showPictureViewer(pictureIndex: number): void {
    this.hidePictureViewer()

    this.overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      hasBackdrop: true,
    })
    this.overlayRef.attach(this.cdkPortal)
    this.selectedPictureIndex = pictureIndex
  }

  hidePictureViewer(): void {
    if (this.overlayRef) {
      this.overlayRef.detach()
      this.overlayRef.dispose()
      this.overlayRef = null
      this.selectedPictureIndex = null
    }
  }
}
