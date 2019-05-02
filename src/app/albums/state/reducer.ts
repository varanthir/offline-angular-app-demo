import { Action } from '@ngrx/store'
import { Album } from './dto/album'
import { AlbumsActions, GetAlbumsSuccessAction, GetAlbumSuccessAction } from './actions'
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

export function albumsReducer(state = initialState, action: Action): AlbumsState {
  switch (action.type) {
    case AlbumsActions.GET_ALBUMS:
      return {
        ...state,
        listStatus: ActionStatus.Pending,
      }

    case AlbumsActions.GET_ALBUMS_SUCCESS:
      return {
        ...state,
        list: (action as GetAlbumsSuccessAction).payload.albums,
        listStatus: ActionStatus.Success,
      }

    case AlbumsActions.GET_ALBUMS_ERROR:
      return {
        ...state,
        listStatus: ActionStatus.Error,
      }

    case AlbumsActions.GET_ALBUM:
      return {
        ...state,
        selectedStatus: ActionStatus.Pending,
      }

    case AlbumsActions.GET_ALBUM_SUCCESS:
      return {
        ...state,
        selected: (action as GetAlbumSuccessAction).payload.album,
        selectedStatus: ActionStatus.Success,
      }

    case AlbumsActions.GET_ALBUM_ERROR:
      return {
        ...state,
        selectedStatus: ActionStatus.Error,
      }

    default: {
      return state
    }
  }
}
