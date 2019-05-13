import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAlbums from './albums/albums.reducer'
import * as fromOnlineAlbums from './albums/online-albums/online-albums.reducer'
import * as fromOfflineAlbums from './albums/offline-albums/offline-albums.reducer'
import * as fromDownloadAlbum from './download-album/download-album.reducer'
import { ActionStatus } from 'utils/ngrx/action-status'
import difference from 'lodash.difference'
import { Album } from './dal/dto/album'

export const ALBUMS_STATE_KEY = 'albums'
export const DOWNLOAD_ALBUM_STATE_KEY = 'downloadAlbums'

export type AlbumsAppState = {
  [ALBUMS_STATE_KEY]: fromAlbums.AlbumsState,
  [DOWNLOAD_ALBUM_STATE_KEY]: fromDownloadAlbum.DownloadAlbumState,
}

export const getAlbumsState =  createFeatureSelector<AlbumsAppState, fromAlbums.AlbumsState>(ALBUMS_STATE_KEY)
export const getDownloadAlbumState =  createFeatureSelector<AlbumsAppState, fromDownloadAlbum.DownloadAlbumState>(DOWNLOAD_ALBUM_STATE_KEY)


// albums.online
export const getOnlineAlbumsState = createSelector(
  getAlbumsState,
  state => state.online
)

export const getAlbums = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectAll
)

export const getOnlineAlbums = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectAll
)

export const getOnlineAlbumIds = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectIds
)

export const getOnlineAlbumEntities = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectEntities
)

export const getAlbumEntities = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectEntities
)

export const getAlbumsStatus = createSelector(
  getOnlineAlbumsState,
  ({ albumsStatus }) => albumsStatus
)

export const getEmptyAlbumsPending = createSelector(
  getOnlineAlbumsState,
  getAlbums,
  ({ albumsStatus }, albums) => albums.length === 0 && albumsStatus === ActionStatus.Pending
)

export const getSelectedAlbumId = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.getSelectedAlbumId
)

export const getAlbum = createSelector(
  getAlbumEntities,
  getSelectedAlbumId,
  (albumEntities, selectedAlbumId) => selectedAlbumId && albumEntities[selectedAlbumId] || null
)

export const getOnlineAlbum = createSelector(
  getAlbumEntities,
  getSelectedAlbumId,
  (albumEntities, selectedAlbumId) => selectedAlbumId && albumEntities[selectedAlbumId] || null
)

export const getAlbumStatus = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.getSelectedAlbumIdStatus
)

export const getOnlineAlbumStatus = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.getSelectedAlbumIdStatus
)


// albums.offline
export const getOfflineAlbumsState = createSelector(
  getAlbumsState,
  state => state.offline
)

export const getOfflineAlbumIds = createSelector(
  getOfflineAlbumsState,
  fromOfflineAlbums.selectIds
)

export const getOfflineAlbumEntities = createSelector(
  getOfflineAlbumsState,
  fromOfflineAlbums.selectEntities
)

export const getOfflineAlbums = createSelector(
  getOfflineAlbumsState,
  fromOfflineAlbums.selectAll
)

export const getSelectedOfflineAlbumId = createSelector(
  getOfflineAlbumsState,
  fromOnlineAlbums.getSelectedAlbumId
)

export const getOfflineAlbum = createSelector(
  getOfflineAlbumEntities,
  getSelectedOfflineAlbumId,
  (albumEntities, selectedAlbumId) => selectedAlbumId && albumEntities[selectedAlbumId] || null
)

export const getOfflineAlbumStatus = createSelector(
  getOfflineAlbumsState,
  fromOfflineAlbums.getSelectedAlbumIdStatus
)


// albums
export const _getAlbums = createSelector(
  getOnlineAlbumIds,
  getOfflineAlbumIds,
  getOnlineAlbumEntities,
  getOfflineAlbums,
  (onlineIds: number[], offlineIds: number[], onlineEntities, offlineAlbums) => {
    const onlyOnlineIds = difference<number>(onlineIds, offlineIds)
    const onlyOnlineAlbums = onlyOnlineIds.map(id => onlineEntities[id] as Album)

    return [
      ...onlyOnlineAlbums,
      ...offlineAlbums,
    ].sort((a, b) => {
      if (b.name > a.name) { return -1 }
      if (a.name > b.name) { return 1 }
      return 0
    })
  }
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
