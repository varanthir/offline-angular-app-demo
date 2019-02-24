import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { AlbumsTableComponent } from './components/albums-table/albums-table.component';
import { MatTableModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AlbumsComponent, AlbumsTableComponent],
  imports: [
    AlbumsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ]
})
export class AlbumsModule {}
