import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { albumsReducer } from './albums/albums.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AlbumsEffects } from './albums/albums.effects'
import { AlbumsFacadeService } from './albums/albums.facade'
import { HttpClientModule } from '@angular/common/http'
import { ALBUMS_STATE_KEY, DOWNLOAD_ALBUM_STATE_KEY } from './index'
import { AlbumsDaoService } from './dao/albums.dao';
import { DownloadAlbumFacadeService } from './download-album/download-album.facade';
import { DownloadAlbumEffects } from './download-album/download-album.effects';
import { downloadAlbumReducer } from './download-album/download-album.reducer';

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
    DownloadAlbumFacadeService,
  ]
})
export class AlbumsStateModule {}
