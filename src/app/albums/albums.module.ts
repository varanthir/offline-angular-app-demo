import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AlbumsRoutingModule } from './albums-routing.module'
import { AlbumsComponent } from './albums.component'
import { AlbumsTableComponent } from './components/albums-table/albums-table.component'
import { MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material'
import { AlbumsStateModule } from './state/state.module'

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumsTableComponent,
  ],
  imports: [
    AlbumsRoutingModule,
    AlbumsStateModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
  ]
})
export class AlbumsModule {}
