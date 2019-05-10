import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material'
import { AlbumsRoutingModule } from './albums-routing.module'
import { AlbumsComponent } from './albums.component'
import { AlbumsTableComponent } from './components/albums-table/albums-table.component'
import { AlbumsStateModule } from './state/state.module'
import { AlbumViewerComponent } from './album-viewer/album-viewer.component'
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { FailedActionComponent } from './components/failed-action/failed-action.component'
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumsTableComponent,
    AlbumViewerComponent,
    DownloadAlbumModalComponent,
    FailedActionComponent,
    PictureViewerComponent,
  ],
  imports: [
    AlbumsRoutingModule,
    AlbumsStateModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
  ]
})
export class AlbumsModule {}
