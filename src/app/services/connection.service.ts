import { Injectable } from '@angular/core'
import { Observable, merge, of, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ConnectionService {
  private readonly connectivityChange$: Observable<{}> = merge(
    of({}),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  )

  readonly isOnline$: Observable<boolean> = this.connectivityChange$.pipe(
    map(() => this.isOnline))

  get isOnline(): boolean {
    return navigator.onLine
  }
}
