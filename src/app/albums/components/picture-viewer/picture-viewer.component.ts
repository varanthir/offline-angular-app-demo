import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Picture } from 'app/albums/state/dto/picture';

@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html',
  styleUrls: ['./picture-viewer.component.scss']
})
export class PictureViewerComponent {
  @Input() public pictures: Picture[]
  @Input() public selectedIndex: number | null = null

  @Output() public readonly selectIndex = new EventEmitter<number>()
  @Output() public readonly close = new EventEmitter<void>()

  public get src(): string {
    if (this.selectedIndex === null) {
      return '#'
    }
    const pictureId = this.pictures[this.selectedIndex].id
    return `api/pictures/${pictureId}`
  }
}
