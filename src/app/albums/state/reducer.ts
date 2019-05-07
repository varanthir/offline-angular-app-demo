import { Album } from './dto/album'
import { AlbumsActionsTypes, AlbumsActions } from './actions'
import { ActionStatus } from 'utils/ngrx/action-status'

export type AlbumsState = {
  list: Album[] | null,
  listStatus: ActionStatus | null,
  selected: Album | null,
  selectedStatus: ActionStatus | null,
}

const initialState: AlbumsState = {
  list: null,
  listStatus: null,
  selected: null,
  selectedStatus: null,
}

export function albumsReducer(state = initialState, action: AlbumsActions): AlbumsState {
  switch (action.type) {
    case AlbumsActionsTypes.GET_ALBUMS:
      return {
        ...state,
        listStatus: ActionStatus.Pending,
      }

    case AlbumsActionsTypes.GET_ALBUMS_SUCCESS:
      return {
        ...state,
        list: action.payload.albums,
        listStatus: ActionStatus.Success,
      }

    case AlbumsActionsTypes.GET_ALBUMS_ERROR:
      return {
        ...state,
        listStatus: ActionStatus.Error,
      }

    case AlbumsActionsTypes.GET_ALBUM:
      return {
        ...state,
        selectedStatus: ActionStatus.Pending,
      }

    case AlbumsActionsTypes.GET_ALBUM_SUCCESS:
      return {
        ...state,
        selected: action.payload.album,
        selectedStatus: ActionStatus.Success,
      }

    case AlbumsActionsTypes.GET_ALBUM_ERROR:
      return {
        ...state,
        selectedStatus: ActionStatus.Error,
      }

    default: {
      return state
    }
  }
}
