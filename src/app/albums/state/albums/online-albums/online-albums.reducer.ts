import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Album } from '../../dal/dto/album'
import { OnlineAlbumsActionTypes, OnlineAlbumsActions } from './online-albums.actions'
import { ActionStatus } from 'utils/ngrx/action-status'

export interface OnlineAlbumsState extends EntityState<Album> {
  albumsStatus: ActionStatus | null,
  selectedAlbumId: number | null,
  selectedAlbumIdStatus: ActionStatus | null,
}

const onlineAlbumsAdapter = createEntityAdapter<Album>()

const initialState: OnlineAlbumsState = onlineAlbumsAdapter.getInitialState({
  albumsStatus: null,
  selectedAlbumId: null,
  selectedAlbumIdStatus: null,
})

export function onlineAlbumsReducer(state = initialState, action: OnlineAlbumsActions): OnlineAlbumsState {
  switch (action.type) {
    case OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS:
      return {
        ...state,
        albumsStatus: ActionStatus.Pending,
      }

    case OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS_SUCCESS:
      return {
        ...onlineAlbumsAdapter.addAll(action.payload.albums, state),
        albumsStatus: ActionStatus.Success,
      }

    case OnlineAlbumsActionTypes.GET_ONLINE_ALBUMS_ERROR:
      return {
        ...state,
        albumsStatus: ActionStatus.Error,
      }

    case OnlineAlbumsActionTypes.GET_ONLINE_ALBUM:
      return {
        ...state,
        selectedAlbumId: action.payload.albumId,
        selectedAlbumIdStatus: ActionStatus.Pending,
      }

    case OnlineAlbumsActionTypes.GET_ONLINE_ALBUM_SUCCESS:
      return {
        ...onlineAlbumsAdapter.upsertOne(action.payload.album, state),
        selectedAlbumIdStatus: ActionStatus.Success,
      }

    case OnlineAlbumsActionTypes.GET_ONLINE_ALBUM_ERROR:
      return {
        ...state,
        selectedAlbumIdStatus: ActionStatus.Error,
      }

    default: {
      return state
    }
  }
}

export const getAlbumsStatus = (state: OnlineAlbumsState) => state.albumsStatus
export const getSelectedAlbumId = (state: OnlineAlbumsState) => state.selectedAlbumId
export const getSelectedAlbumIdStatus = (state: OnlineAlbumsState) => state.selectedAlbumIdStatus
export const { selectAll: getAllAlbums, selectEntities: getAlbumEntities } = onlineAlbumsAdapter.getSelectors()
