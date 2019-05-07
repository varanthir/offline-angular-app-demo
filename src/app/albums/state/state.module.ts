import { NgModule } from '@angular/core'
import { AlbumsDaoService } from './dao.service'
import { StoreModule } from '@ngrx/store';
import { albumsReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { AlbumsEffects } from './effects';
import { AlbumsFacadeService } from './facade.service';
import { HttpClientModule } from '@angular/common/http';
import { ALBUMS_STATE_KEY } from '.';

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
