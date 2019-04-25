import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Album } from 'app/albums/state/dto/album';

@Component({
  selector: 'app-albums-table',
  templateUrl: './albums-table.component.html',
  styleUrls: ['./albums-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsTableComponent {
  @Input() public set albums(newAlbums: Album[]) {
    this.dataSource.data = newAlbums
  }

  @Input() public isPending = false;

  public readonly columns: string[] = ['name', 'imagesCount', 'isSaved']
  public readonly dataSource = new MatTableDataSource<Album>()
}
