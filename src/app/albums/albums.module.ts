import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AlbumsRoutingModule } from './albums-routing.module'
import { AlbumsComponent } from './albums.component'
import { AlbumsTableComponent } from './components/albums-table/albums-table.component'
import { MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material'
import { AlbumsStateModule } from './state/state.module'
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumsTableComponent,
    AlbumViewerComponent,
    PictureViewerComponent,
  ],
  imports: [
    AlbumsRoutingModule,
    AlbumsStateModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
  ]
})
export class AlbumsModule {}
