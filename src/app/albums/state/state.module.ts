import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { albumsReducer } from './albums/albums.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AlbumsEffects } from './albums/albums.effects'
import { AlbumsFacadeService } from './albums/albums.facade'
import { HttpClientModule } from '@angular/common/http'
import { ALBUMS_STATE_KEY, DOWNLOAD_ALBUM_STATE_KEY } from './index'
import { AlbumsDaoService } from './dao/albums.dao'
import { DownloadAlbumFacadeService } from './download-album/download-album.facade'
import { DownloadAlbumEffects } from './download-album/download-album.effects'
import { downloadAlbumReducer } from './download-album/download-album.reducer'
import { AlbumsFinishedStorageService } from './dao/albums-finished.storage'
import { AlbumsStorageService } from './dao/albums.storage'
import { AlbumViewerDbService } from './dao/album-viewer-db.service'
import { PicturesStorageService } from './dao/pictures.storage'
import { ThumbnailsStorageService } from './dao/thumbnails.storage'

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(ALBUMS_STATE_KEY, albumsReducer),
    StoreModule.forFeature(DOWNLOAD_ALBUM_STATE_KEY, downloadAlbumReducer),
    EffectsModule.forFeature([
      AlbumsEffects,
      DownloadAlbumEffects,
    ]),
  ],
  providers: [
    AlbumsDaoService,
    AlbumsFacadeService,
    AlbumsFinishedStorageService,
    AlbumsStorageService,
    AlbumViewerDbService,
    DownloadAlbumFacadeService,
    PicturesStorageService,
    ThumbnailsStorageService,
  ]
})
export class AlbumsStateModule {}
