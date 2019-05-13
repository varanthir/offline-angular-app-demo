import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AlbumsComponent } from './albums.component'
import { OnlineAlbumViewerComponent } from './online-album-viewer/online-album-viewer.component';
import { OfflineAlbumViewerComponent } from './offline-album-viewer/offline-album-viewer.component';

const routes: Routes = [
  { path: '', component: AlbumsComponent },
  { path: ':albumId', component: OnlineAlbumViewerComponent },
  { path: 'offline/:albumId', component: OfflineAlbumViewerComponent },
  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {}
