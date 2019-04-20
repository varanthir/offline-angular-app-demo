import {
  ActionReducerMap,
} from '@ngrx/store'
import { OfflineState, offlineReducer } from './offline/reducer'

export type AppState = {
  offline: OfflineState,
}

export const appReducer: ActionReducerMap<AppState> = {
  offline: offlineReducer,
}
