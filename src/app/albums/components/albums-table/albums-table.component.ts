import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

class AlbumElement {
  constructor(
    public readonly name: string,
    public readonly imagesCount: number,
    public readonly isSaved: boolean,
  ) {}
}

const ELEMENT_DATA: AlbumElement[] = Array.from({ length: 10 }, (v, i) => i + 1)
  .map(val => new AlbumElement(`Album album album ${val}`, val, val % 2 === 0));

@Component({
  selector: 'app-albums-table',
  templateUrl: './albums-table.component.html',
  styleUrls: ['./albums-table.component.scss']
})
export class AlbumsTableComponent {
  displayedColumns: string[] = ['name', 'imagesCount', 'isSaved'];
  dataSource = new MatTableDataSource<AlbumElement>(ELEMENT_DATA);
}
