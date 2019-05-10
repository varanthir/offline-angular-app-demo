import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { appReducer } from './reducer'
import { EffectsModule } from '@ngrx/effects'
import { environment } from 'environments/environment'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 300, name: 'Album Viewer' }),
    EffectsModule.forRoot([]),
  ],
})
export class AppStateModule {}
