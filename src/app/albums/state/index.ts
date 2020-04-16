import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAlbums from './albums/albums.reducer'
import * as fromOnlineAlbums from './albums/online-albums/online-albums.reducer'
import * as fromOfflineAlbums from './albums/offline-albums/offline-albums.reducer'
import * as fromOfflineFiles from './albums/offline-files/offline-files.reducer'
import * as fromDownloadAlbum from './download-album/download-album.reducer'
import { ActionStatus } from 'utils/ngrx/action-status'
import difference from 'lodash.difference'
import { Album } from './dal/dto/album'
import { StorageEstimateState } from './storage-estimate/storage-estimate.reducer';

export const ALBUMS_STATE_KEY = 'albums'
export const DOWNLOAD_ALBUM_STATE_KEY = 'downloadAlbums'
export const STORAGE_ESTIMATE_STATE_KEY = 'storageEstimate'

export type AlbumsAppState = {
  [ALBUMS_STATE_KEY]: fromAlbums.AlbumsState,
  [DOWNLOAD_ALBUM_STATE_KEY]: fromDownloadAlbum.DownloadAlbumState,
  [STORAGE_ESTIMATE_STATE_KEY]: StorageEstimateState,
}

export const getAlbumsState = createFeatureSelector<AlbumsAppState, fromAlbums.AlbumsState>(ALBUMS_STATE_KEY)
export const getDownloadAlbumState = createFeatureSelector<AlbumsAppState, fromDownloadAlbum.DownloadAlbumState>(DOWNLOAD_ALBUM_STATE_KEY)
export const getStorageEstimateState = createFeatureSelector<AlbumsAppState, StorageEstimateState>(STORAGE_ESTIMATE_STATE_KEY)

// albums.online
export const getOnlineAlbumsState = createSelector(
  getAlbumsState,
  state => state.online
)

export const getOnlineAlbumIds = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectIds
)

export const getOnlineAlbumEntities = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectEntities
)

export const getOnlineAlbums = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.selectAll
)

export const getSelectedOnlineAlbumId = createSelector(
  getOnlineAlbumsState,
  fromOnlineAlbums.getSelectedAlbumId
)

export const getOnlineAlbum = createSelector(
  getOnlineAlbumEntities,
  getSelectedOnlineAlbumId,
  (albumEntities, selectedAlbumId) => selectedAlbumId && albumEntities[selectedAlbumId] || null
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
export const getAlbums = createSelector(
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

export const getAlbumsStatus = createSelector(
  getOnlineAlbumsState,
  getOfflineAlbumsState,
  (onlineAlbumsState, offlineAlbumsState) => {
    if (onlineAlbumsState.albumsStatus === ActionStatus.Success && offlineAlbumsState.albumsStatus === ActionStatus.Success) {
      return ActionStatus.Success
    }
    if (onlineAlbumsState.albumsStatus === ActionStatus.Pending || offlineAlbumsState.albumsStatus === ActionStatus.Pending) {
      return ActionStatus.Pending
    }
    if (onlineAlbumsState.albumsStatus === ActionStatus.Error || offlineAlbumsState.albumsStatus === ActionStatus.Error) {
      return ActionStatus.Error
    }
    return null
  }
)

export const getEmptyAlbumsPending = createSelector(
  getAlbumsStatus,
  getOnlineAlbums,
  getOfflineAlbums,
  (albumsStatus, onlineAlbums, offlineAlbums) =>
    albumsStatus === ActionStatus.Pending
    && onlineAlbums.length === 0
    && offlineAlbums.length === 0
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


// offlineFiles
export const getOfflineFiles = createSelector(
  getAlbumsState,
  state => ({
    pictures: fromOfflineFiles.selectAllPictures(state.offlineFiles.pictures),
    thumbnails: fromOfflineFiles.selectAllPictures(state.offlineFiles.thumbnails),
  })
)

export const getOfflineFilesEntities = createSelector(
  getAlbumsState,
  state => ({
    pictures: fromOfflineFiles.selectPictureEntities(state.offlineFiles.pictures),
    thumbnails: fromOfflineFiles.selectThumbnailEntities(state.offlineFiles.thumbnails),
  })
)
