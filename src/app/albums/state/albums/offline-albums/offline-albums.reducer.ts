import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Album } from '../../dal/dto/album'
import { OfflineAlbumsActionTypes, OfflineAlbumsActions } from './offline-albums.actions'
import { ActionStatus } from 'utils/ngrx/action-status'

export interface OfflineAlbumsState extends EntityState<Album> {
  albumsStatus: ActionStatus | null,
  selectedAlbumId: number | null,
  selectedAlbumIdStatus: ActionStatus | null,
}

const offlineAlbumsAdapter = createEntityAdapter<Album>({ selectId: album => album.id })

const initialState: OfflineAlbumsState = offlineAlbumsAdapter.getInitialState({
  albumsStatus: null,
  selectedAlbumId: null,
  selectedAlbumIdStatus: null,
})

export function offlineAlbumsReducer(state = initialState, action: OfflineAlbumsActions): OfflineAlbumsState {
  switch (action.type) {
    case OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS:
      return {
        ...state,
        albumsStatus: ActionStatus.Pending,
      }

    case OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS_SUCCESS:
      return {
        ...offlineAlbumsAdapter.addAll(action.payload.albums, state),
        albumsStatus: ActionStatus.Success,
      }

    case OfflineAlbumsActionTypes.GET_OFFLINE_ALBUMS_ERROR:
      return {
        ...state,
        albumsStatus: ActionStatus.Error,
      }

    case OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM:
      return {
        ...state,
        selectedAlbumId: action.payload.albumId,
        selectedAlbumIdStatus: ActionStatus.Pending,
      }

    case OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM_SUCCESS:
      return {
        ...offlineAlbumsAdapter.upsertOne(action.payload.album, state),
        selectedAlbumIdStatus: ActionStatus.Success,
      }

    case OfflineAlbumsActionTypes.GET_OFFLINE_ALBUM_ERROR:
      return {
        ...state,
        selectedAlbumIdStatus: ActionStatus.Error,
      }

    default: {
      return state
    }
  }
}

export const getAlbumsStatus = (state: OfflineAlbumsState) => state.albumsStatus
export const getSelectedAlbumId = (state: OfflineAlbumsState) => state.selectedAlbumId
export const getSelectedAlbumIdStatus = (state: OfflineAlbumsState) => state.selectedAlbumIdStatus
export const { selectAll, selectEntities, selectIds } = offlineAlbumsAdapter.getSelectors()
