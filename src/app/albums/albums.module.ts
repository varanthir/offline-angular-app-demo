import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatProgressBarModule } from '@angular/material'

import { AlbumsRoutingModule } from './albums-routing.module'
import { AlbumsComponent } from './albums.component'
import { AlbumsTableComponent } from './components/albums-table/albums-table.component'
import { AlbumsStateModule } from './state/state.module'
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AlbumViewerDbService } from './services/album-viewer-db.service';
import { FailedActionComponent } from './components/failed-action/failed-action.component';
import { AlbumsStorageService } from './services/albums.storage';
import { PicturesStorageService } from './services/pictures.storage';
import { ThumbnailsStorageService } from './services/thumbnails.storage';
import { AlbumsFinishedStorageService } from './services/albums-finished.storage';
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component';

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
  ],
  providers: [
    AlbumViewerDbService,
    AlbumsStorageService,
    AlbumsFinishedStorageService,
    PicturesStorageService,
    ThumbnailsStorageService,
  ]
})
export class AlbumsModule {}
