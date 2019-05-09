import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAlbums from './reducers/albums.reducer';
import { ActionStatus } from 'utils/ngrx/action-status';

export const ALBUMS_STATE_KEY = 'albums'

export type AlbumsAppState = {
  [ALBUMS_STATE_KEY]: fromAlbums.AlbumsState,
}

export const getAlbumsState =  createFeatureSelector<AlbumsAppState, fromAlbums.AlbumsState>(ALBUMS_STATE_KEY)

export const getAlbums = createSelector(
  getAlbumsState,
  fromAlbums.getAllAlbums
)

export const getAlbumEntities = createSelector(
  getAlbumsState,
  fromAlbums.getAlbumEntities
)

export const getAlbumsStatus = createSelector(
  getAlbumsState,
  ({ albumsStatus }) => albumsStatus
)

export const getEmptyAlbumsPending = createSelector(
  getAlbumsState,
  getAlbums,
  ({ albumsStatus }, albums) => albums.length === 0 && albumsStatus === ActionStatus.Pending
)

export const getSelectedAlbumId = createSelector(
  getAlbumsState,
  fromAlbums.getSelectedAlbumId
)

export const getAlbum = createSelector(
  getAlbumEntities,
  getSelectedAlbumId,
  (albumEntities, selectedAlbumId) => selectedAlbumId && albumEntities[selectedAlbumId] || null
)

export const getAlbumStatus = createSelector(
  getAlbumsState,
  fromAlbums.getSelectedAlbumIdStatus
)
