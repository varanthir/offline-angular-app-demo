import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
} from '@angular/material'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { appReducer } from './state/reducer'
import { EffectsModule } from '@ngrx/effects'
import { AppStateModule } from './state/app-state.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
