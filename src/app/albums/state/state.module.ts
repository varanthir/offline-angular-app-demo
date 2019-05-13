import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { albumsReducer } from './albums/albums.reducer'
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http'
import { ALBUMS_STATE_KEY, DOWNLOAD_ALBUM_STATE_KEY } from './index'
import { AlbumsDaoService } from './dal/dao/albums.dao'
import { DownloadAlbumFacadeService } from './download-album/download-album.facade'
import { DownloadAlbumEffects } from './download-album/download-album.effects'
import { downloadAlbumReducer } from './download-album/download-album.reducer'
import { AlbumsFinishedStorageService } from './dal/dao/albums-finished.storage'
import { AlbumsStorageService } from './dal/dao/albums.storage'
import { AlbumViewerDbService } from './dal/dao/album-viewer-db.service'
import { PicturesStorageService } from './dal/dao/pictures.storage'
import { ThumbnailsStorageService } from './dal/dao/thumbnails.storage'
import { OnlineAlbumsEffects } from './albums/online-albums/online-albums.effects'
import { OfflineAlbumsEffects } from './albums/offline-albums/offline-albums.effects'
import { AlbumsFacadeService } from './albums/albums.facade'

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(ALBUMS_STATE_KEY, albumsReducer),
    StoreModule.forFeature(DOWNLOAD_ALBUM_STATE_KEY, downloadAlbumReducer),
    EffectsModule.forFeature([
      DownloadAlbumEffects,
      OfflineAlbumsEffects,
      OnlineAlbumsEffects,
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
