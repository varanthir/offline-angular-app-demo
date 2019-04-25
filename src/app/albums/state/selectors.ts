import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AlbumsState } from './reducer';
import { ActionStatus } from 'utils/ngrx/action-status';

export type AlbumsAppState = {
  albums: AlbumsState,
}

export const getAlbumsState =  createFeatureSelector<AlbumsAppState, AlbumsState>('albums')

export const getAlbums = createSelector(
  getAlbumsState,
  ({ list }) => list
)

export const getAlbumsStatus = createSelector(
  getAlbumsState,
  ({ listStatus }) => listStatus
)

export const getEmptyAlbumsPending = createSelector(
  getAlbumsState,
  ({ list, listStatus }) => list === null && listStatus === ActionStatus.Pending
)
