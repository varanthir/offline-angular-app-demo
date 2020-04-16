import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlbumsRoutingModule } from './albums-routing.module'
import { AlbumsComponent } from './albums.component'
import { AlbumsTableComponent } from './components/albums-table/albums-table.component'
import { AlbumsStateModule } from './state/albums-state.module'
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { FailedActionComponent } from './components/failed-action/failed-action.component'
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'
import { DeleteAlbumDialogComponent } from './components/delete-album-dialog/delete-album-dialog.component'
import { OnlineAlbumViewerComponent } from './online-album-viewer/online-album-viewer.component'
import { AlbumViewerComponent } from './components/album-viewer/album-viewer.component'
import { OfflineAlbumViewerComponent } from './offline-album-viewer/offline-album-viewer.component'
import { OfflineFilesUrlsService } from './services/offline-files-urls.service'
import { SharedModule } from 'app/shared/shared.module';

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
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    OfflineFilesUrlsService,
  ]
})
export class AlbumsModule {}
