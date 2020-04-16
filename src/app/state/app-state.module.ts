import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { appReducer } from './index'
import { EffectsModule } from '@ngrx/effects'
import { environment } from 'environments/environment'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { SafeDataFacadeService } from './safe-data.facade';

const storeDevtoolsName = 'Album Viewer'.concat(environment.production ? ' --prod' : '')

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        // strictStateSerializability: true,
        // strictActionSerializability: true,
        strictActionWithinNgZone: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 300, name: storeDevtoolsName }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    SafeDataFacadeService
  ]
})
export class AppStateModule {}
