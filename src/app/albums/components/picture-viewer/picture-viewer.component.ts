import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core'
import { Picture } from 'app/albums/state/dal/dto/picture'
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html',
  styleUrls: ['./picture-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureViewerComponent {
  @Input() pictures: Picture[]
  @Input() getPictureUrlFn: (pictureId: number | null) => SafeUrl | string
  @Input() getThumbnailUrlFn: (pictureId: number | null) => SafeUrl | string

  private _selectedIndex: number | null = null

  @Input() set selectedIndex(selectedIndex: number | null) {
    this._selectedIndex = selectedIndex
    if (selectedIndex !== null) {
      this.scrollThumbnailIntoView(selectedIndex)
    }
  }

  get selectedIndex(): number | null {
    return this._selectedIndex
  }

  @Output() readonly selectIndex = new EventEmitter<number>()
  @Output() readonly close = new EventEmitter<void>()

  @ViewChild('thumbnails', { static: true }) thumbnailsRef: ElementRef<HTMLDivElement>

  thumbnailStyles = {}

  get src(): SafeUrl | string {
    if (this.selectedIndex === null) {
      return this.getPictureUrlFn(null)
    }
    const pictureId = this.pictures[this.selectedIndex].id

    return this.getPictureUrlFn(pictureId)
  }

  get showPreviousButton(): boolean {
    return this.selectedIndex !== null && this.selectedIndex > 0
  }

  get showNextButton(): boolean {
    return this.selectedIndex !== null && this.selectedIndex < this.pictures.length - 1
  }

  showPreviousImage(): void {
    if (this.selectedIndex !== null) {
      this.selectIndex.emit(this.selectedIndex - 1)
    }
  }

  showNextImage(): void {
    if (this.selectedIndex !== null) {
      this.selectIndex.emit(this.selectedIndex + 1)
    }
  }

  refreshThumbnailStyles(): void {
    if (this.thumbnailsRef) {
      this.thumbnailStyles =  {
        width: `${this.thumbnailsRef.nativeElement.clientHeight * 16 / 9}px`
      }
    } else {
      this.thumbnailStyles = {}
    }
  }

  trackById(index: number, picture: Picture) {
    return picture.id
  }

  scrollThumbnailIntoView(thumbnailIndex: number | null): void {
    if (thumbnailIndex === null) {
      return
    }

    const thumbnailId = this.pictures[thumbnailIndex].id
    const selector = `img.thumbnails__thumbnail[data-id='${thumbnailId}']`
    const thumbnailEl = document.querySelector(selector)
    if (thumbnailEl) {
      thumbnailEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }
}
