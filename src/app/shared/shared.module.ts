import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Async2Pipe, Async2FnPipe } from './pipes'

const pipes = [
  Async2Pipe,
  Async2FnPipe,
]

@NgModule({
  declarations: [
    pipes,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    pipes,
  ],
})
export class SharedModule {}
