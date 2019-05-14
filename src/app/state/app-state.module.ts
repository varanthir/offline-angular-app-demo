import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { appReducer } from './reducer'
import { EffectsModule } from '@ngrx/effects'
import { environment } from 'environments/environment'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

const storeDevtoolsName = 'Album Viewer'.concat(environment.production ? ' --prod' : '')

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 300, name: storeDevtoolsName }),
    EffectsModule.forRoot([]),
  ],
})
export class AppStateModule {}
