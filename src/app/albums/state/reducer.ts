import { Action } from '@ngrx/store'
import { Album } from './dto/album';
import { AlbumsActions, GetAlbumsSuccessAction } from './actions';

export type AlbumsState = {
  list: Album[] | null,
}

const initialState: AlbumsState = {
  list: null,
}

export function albumsReducer(state = initialState, action: Action): AlbumsState {
  switch (action.type) {
    case AlbumsActions.GET_ALBUMS_SUCCESS:
      return {
        ...state,
        list: (action as GetAlbumsSuccessAction).payload.albums,
      }

    default: {
      return state
    }
  }
}
