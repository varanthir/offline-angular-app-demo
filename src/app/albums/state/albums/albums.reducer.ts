import { combineReducers } from '@ngrx/store';
import { onlineAlbumsReducer, OnlineAlbumsState } from './online-albums/online-albums.reducer';
import { OfflineAlbumsState, offlineAlbumsReducer } from './offline-albums/offline-albums.reducer';

export type AlbumsState = {
  online: OnlineAlbumsState,
  offline: OfflineAlbumsState,
}

export const albumsReducer = combineReducers<AlbumsState>({
  online: onlineAlbumsReducer,
  offline: offlineAlbumsReducer,
})
