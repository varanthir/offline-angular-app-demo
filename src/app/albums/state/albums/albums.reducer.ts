import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Album } from './dto/album'
import { AlbumsActionsTypes, AlbumsActions } from './albums.actions'
import { ActionStatus } from 'utils/ngrx/action-status'

export interface AlbumsState extends EntityState<Album> {
  albumsStatus: ActionStatus | null,
  selectedAlbumId: number | null,
  selectedAlbumIdStatus: ActionStatus | null,
}

export const adapter = createEntityAdapter<Album>()

const initialState: AlbumsState = adapter.getInitialState({
  albumsStatus: null,
  selectedAlbumId: null,
  selectedAlbumIdStatus: null,
})

export function albumsReducer(state = initialState, action: AlbumsActions): AlbumsState {
  switch (action.type) {
    case AlbumsActionsTypes.GET_ALBUMS:
      return {
        ...state,
        albumsStatus: ActionStatus.Pending,
      }

    case AlbumsActionsTypes.GET_ALBUMS_SUCCESS:
      return {
        ...adapter.addAll(action.payload.albums, state),
        albumsStatus: ActionStatus.Success,
      }

    case AlbumsActionsTypes.GET_ALBUMS_ERROR:
      return {
        ...state,
        albumsStatus: ActionStatus.Error,
      }

    case AlbumsActionsTypes.GET_ALBUM:
      return {
        ...state,
        selectedAlbumId: action.payload.albumId,
        selectedAlbumIdStatus: ActionStatus.Pending,
      }

    case AlbumsActionsTypes.GET_ALBUM_SUCCESS:
      return {
        ...adapter.upsertOne(action.payload.album, state),
        selectedAlbumIdStatus: ActionStatus.Success,
      }

    case AlbumsActionsTypes.GET_ALBUM_ERROR:
      return {
        ...state,
        selectedAlbumIdStatus: ActionStatus.Error,
      }

    default: {
      return state
    }
  }
}

export const getAlbumsStatus = (state: AlbumsState) => state.albumsStatus
export const getSelectedAlbumId = (state: AlbumsState) => state.selectedAlbumId
export const getSelectedAlbumIdStatus = (state: AlbumsState) => state.selectedAlbumIdStatus
export const { selectAll: getAllAlbums, selectEntities: getAlbumEntities } = adapter.getSelectors()
