import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { Album } from 'app/albums/state/dal/dto/album'
import { ScreenService } from 'app/services/screen.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-albums-table',
  templateUrl: './albums-table.component.html',
  styleUrls: ['./albums-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsTableComponent {
  @Input() set albums(newAlbums: Album[]) {
    this.dataSource.data = newAlbums
  }
  @Input() isPending = false
  @Output() readonly downloadAlbum = new EventEmitter<Album>()
  @Output() readonly deleteAlbum = new EventEmitter<Album>()

  readonly dataSource = new MatTableDataSource<Album>()
  readonly columns$ = this.screen.isMobile$.pipe(
    map(isMobile => isMobile
      ? ['name', 'isSaved']
      : ['name', 'imagesCount', 'isSaved']))

  constructor(private readonly screen: ScreenService) {}

  saveOrDelete(album: Album): void {
    if (album.isOffline) {
      this.deleteAlbum.emit(album)
    } else {
      this.downloadAlbum.emit(album)
    }
  }
}
