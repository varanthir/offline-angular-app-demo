import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AppStateModule } from './state/app-state.module'
import { ScreenService } from './services/screen.service'
import { ConnectionService } from './services/connection.service'
import { ContentScrollService } from './services/content-scroll.service'

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
    MatSnackBarModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppStateModule,
  ],
  providers: [
    ConnectionService,
    ScreenService,
    ContentScrollService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
