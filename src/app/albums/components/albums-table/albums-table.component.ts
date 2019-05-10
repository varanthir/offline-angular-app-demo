import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'
import { MatTableDataSource } from '@angular/material'
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
  @Input() public isPending = false
  @Input() public set albums(newAlbums: Album[]) {
    this.dataSource.data = newAlbums
  }

  @Output() public readonly downloadAlbum = new EventEmitter<Album>()

  public readonly dataSource = new MatTableDataSource<Album>()
  public readonly columns$ = this.screen.isMobile$.pipe(
    map(isMobile => isMobile
      ? ['name', 'isSaved']
      : ['name', 'imagesCount', 'isSaved']))

  constructor(private readonly screen: ScreenService) {}
}
