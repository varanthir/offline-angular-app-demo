import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AlbumsComponent } from './albums.component'
import { AlbumViewerComponent } from './album-viewer/album-viewer.component'

const routes: Routes = [
  { path: '', component: AlbumsComponent },
  { path: ':albumId', component: AlbumViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {}
