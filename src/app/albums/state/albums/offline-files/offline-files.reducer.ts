import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { OfflineFileUrl } from '../../dal/dto/offline-file-url';
import { OfflineFilesActions, OfflineFilesActionTypes } from './offline-files.actions';

export type OfflineFilessState = {
  pictures: EntityState<OfflineFileUrl>,
  thumbnails: EntityState<OfflineFileUrl>,
}

const offlinePicturesAdapter = createEntityAdapter<OfflineFileUrl>()
const offlineThumbnailsAdapter = createEntityAdapter<OfflineFileUrl>()

const initialState: OfflineFilessState = {
  pictures: offlinePicturesAdapter.getInitialState(),
  thumbnails: offlineThumbnailsAdapter.getInitialState(),
}

export function offlineFilessReducer(state = initialState, action: OfflineFilesActions): OfflineFilessState {
  switch (action.type) {
    case OfflineFilesActionTypes.GET_OFFLINE_FILES_SUCCESS:
      return {
        ...state,
        pictures: offlinePicturesAdapter.addAll(action.payload.pictures, state.pictures),
        thumbnails: offlineThumbnailsAdapter.addAll(action.payload.thumbnails, state.thumbnails),
      }

    case OfflineFilesActionTypes.CLEAR_OFFLINE_FILES_URLS:
      return initialState

    default: {
      return state
    }
  }
}

export const {
  selectEntities: selectPictureEntities,
  selectAll: selectAllPictures,
} = offlinePicturesAdapter.getSelectors()

export const {
  selectEntities: selectThumbnailEntities,
  selectAll: selectAllThumbnails,
} = offlineThumbnailsAdapter.getSelectors()
