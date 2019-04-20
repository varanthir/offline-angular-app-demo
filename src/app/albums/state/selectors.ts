import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AlbumsState } from './reducer';

export type AlbumsFeatureState = {
  albums: AlbumsState,
}

export const getAlbumsState =  createFeatureSelector<AlbumsFeatureState, AlbumsState>('albums')

export const getAlbums = createSelector(
  getAlbumsState,
  ({ list }) => list
)
