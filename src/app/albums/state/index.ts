import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAlbums from './albums/albums.reducer'
import * as fromDownloadAlbum from './download-album/download-album.reducer'
import { ActionStatus } from 'utils/ngrx/action-status'

export const ALBUMS_STATE_KEY = 'albums'
export const DOWNLOAD_ALBUM_STATE_KEY = 'downloadAlbums'

export type AlbumsAppState = {
  [ALBUMS_STATE_KEY]: fromAlbums.AlbumsState,
  [DOWNLOAD_ALBUM_STATE_KEY]: fromDownloadAlbum.DownloadAlbumState,
}

export const getAlbumsState =  createFeatureSelector<AlbumsAppState, fromAlbums.AlbumsState>(ALBUMS_STATE_KEY)
export const getDownloadAlbumState =  createFeatureSelector<AlbumsAppState, fromDownloadAlbum.DownloadAlbumState>(DOWNLOAD_ALBUM_STATE_KEY)


// Albums
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


// downloadAlbums
export const getDownloadAlbumEntity = createSelector(
  getDownloadAlbumState,
  state => state.album
)

export const getDownloadAlbumStatus = createSelector(
  getDownloadAlbumState,
  state => state.status
)

export const getDownloadAlbumProgress = createSelector(
  getDownloadAlbumState,
  fromDownloadAlbum.getDownloadAlbumProgress
)
