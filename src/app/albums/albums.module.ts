import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material'

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

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumsTableComponent,
    AlbumViewerComponent,
    FailedActionComponent,
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
