import { NgModule } from '@angular/core'
import { AlbumsDaoService } from './dao/albums-dao.service'
import { StoreModule } from '@ngrx/store';
import { albumsReducer } from './reducers/albums.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AlbumsEffects } from './effects/albums.effects';
import { AlbumsFacadeService } from './facades/albums-facade.service';
import { HttpClientModule } from '@angular/common/http';
import { ALBUMS_STATE_KEY } from './index';

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
