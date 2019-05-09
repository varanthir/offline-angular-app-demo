import { NgModule } from '@angular/core'
import { AlbumsDaoService } from './albums/albums.dao'
import { StoreModule } from '@ngrx/store'
import { albumsReducer } from './albums/albums.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AlbumsEffects } from './albums/albums.effects'
import { AlbumsFacadeService } from './albums/albums.facade'
import { HttpClientModule } from '@angular/common/http'
import { ALBUMS_STATE_KEY } from './index'

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(ALBUMS_STATE_KEY, albumsReducer),
    EffectsModule.forFeature([AlbumsEffects]),
  ],
  providers: [
    AlbumsDaoService,
    AlbumsFacadeService,
  ]
})
export class AlbumsStateModule {}
