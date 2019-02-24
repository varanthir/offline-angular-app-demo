import { Component } from '@angular/core'
import { AppState, getOnlineState } from './reducers'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly onlineStatus$ = this.store.select(getOnlineState).pipe(
    map(isOnline => isOnline ? 'online' : 'offline'))

  constructor (private readonly store: Store<AppState>) {}
}
