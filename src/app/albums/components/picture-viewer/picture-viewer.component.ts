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
  @Input() public pictures: Picture[]
  @Input() public getPictureUrlFn: (pictureId: number | null) => SafeUrl | string
  @Input() public getThumbnailUrlFn: (pictureId: number | null) => SafeUrl | string

  private _selectedIndex: number | null = null

  @Input() public set selectedIndex(selectedIndex: number | null) {
    this._selectedIndex = selectedIndex
    if (selectedIndex) {
      this.scrollThumbnailIntoView(selectedIndex)
    }
  }

  public get selectedIndex(): number | null {
    return this._selectedIndex
  }

  @Output() public readonly selectIndex = new EventEmitter<number>()
  @Output() public readonly close = new EventEmitter<void>()

  @ViewChild('thumbnails', { static: true }) thumbnailsRef: ElementRef<HTMLDivElement>

  public thumbnailStyles = {}

  public get src(): SafeUrl | string {
    if (this.selectedIndex === null) {
      return this.getPictureUrlFn(null)
    }
    const pictureId = this.pictures[this.selectedIndex].id

    return this.getPictureUrlFn(pictureId)
  }

  public get showPreviousButton(): boolean {
    return this.selectedIndex !== null && this.selectedIndex > 0
  }

  public get showNextButton(): boolean {
    return this.selectedIndex !== null && this.selectedIndex < this.pictures.length - 1
  }

  public showPreviousImage(): void {
    if (this.selectedIndex !== null) {
      this.selectIndex.emit(this.selectedIndex - 1)
    }
  }

  public showNextImage(): void {
    if (this.selectedIndex !== null) {
      this.selectIndex.emit(this.selectedIndex + 1)
    }
  }

  public refreshThumbnailStyles(): void {
    if (this.thumbnailsRef) {
      this.thumbnailStyles =  {
        width: `${this.thumbnailsRef.nativeElement.clientHeight * 16 / 9}px`
      }
    } else {
      this.thumbnailStyles = {}
    }
  }

  public trackById(index: number, picture: Picture) {
    return picture.id
  }

  private scrollThumbnailIntoView(thumbnailIndex: number): void {
    const thumbnailId = this.pictures[thumbnailIndex].id
    const selector = `img.thumbnails__thumbnail[data-id='${thumbnailId}']`
    const thumbnailEl = document.querySelector(selector)
    if (thumbnailEl) {
      thumbnailEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }
}
