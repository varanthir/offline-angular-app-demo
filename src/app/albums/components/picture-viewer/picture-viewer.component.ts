import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Picture } from 'app/albums/state/dto/picture';

@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html',
  styleUrls: ['./picture-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureViewerComponent {
  @Input() public pictures: Picture[]
  @Input() public selectedIndex: number | null = null

  @Output() public readonly selectIndex = new EventEmitter<number>()
  @Output() public readonly close = new EventEmitter<void>()

  @ViewChild('thumbnails') thumbnailsRef: ElementRef<HTMLDivElement>

  public thumbnailStyles = {}

  public get src(): string {
    if (this.selectedIndex === null) {
      return '#'
    }
    const pictureId = this.pictures[this.selectedIndex].id
    return `api/pictures/${pictureId}`
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
}
