import { NgModule } from '@angular/core'
import { AlbumsDaoService } from './dao.service'
import { StoreModule } from '@ngrx/store';
import { albumsReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { AlbumsEffects } from './effects';
import { AlbumsFacadeService } from './facade.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('albums', albumsReducer),
    EffectsModule.forFeature([AlbumsEffects]),
  ],
  providers: [
    AlbumsDaoService,
    AlbumsFacadeService,
  ]
})
export class AlbumsStateModule {}
