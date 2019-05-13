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
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { FailedActionComponent } from './components/failed-action/failed-action.component'
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'
import { DeleteAlbumDialogComponent } from './components/delete-album-dialog/delete-album-dialog.component';
import { OnlineAlbumViewerComponent } from './online-album-viewer/online-album-viewer.component';
import { AlbumViewerComponent } from './components/album-viewer/album-viewer.component';
import { OfflineAlbumViewerComponent } from './offline-album-viewer/offline-album-viewer.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumsTableComponent,
    AlbumViewerComponent,
    DeleteAlbumDialogComponent,
    DownloadAlbumModalComponent,
    FailedActionComponent,
    OfflineAlbumViewerComponent,
    OnlineAlbumViewerComponent,
    PictureViewerComponent,
  ],
  imports: [
    AlbumsRoutingModule,
    AlbumsStateModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
  ]
})
export class AlbumsModule {}
