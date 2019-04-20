import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducer';

export const getOfflineState =  createFeatureSelector<AppState, boolean>('offline')

export const getOnlineState = createSelector(
  getOfflineState,
  isOffline => !isOffline
)
