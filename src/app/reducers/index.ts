import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store'
import { OfflineState, offlineReducer } from './offline'

export interface AppState {
  offline: OfflineState,
}

export const appReducer: ActionReducerMap<AppState> = {
  offline: offlineReducer,
}

export const getOfflineState =  createFeatureSelector<AppState, boolean>('offline')

export const getOnlineState = createSelector(
  getOfflineState,
  isOffline => !isOffline
)
