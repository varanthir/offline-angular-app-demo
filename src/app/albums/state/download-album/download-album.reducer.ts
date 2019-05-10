import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { ActionStatus, CancelledActionStatus } from 'utils/ngrx/action-status'
import { DownloadAlbumActions, DownloadAlbumActionsTypes } from './download-album.actions'
import { Album } from '../dal/dto/album'

type DownloadPicture = {
  id: number,
  progress: number,
}

const getInitialDownloadPicture = (id: number): DownloadPicture => ({
  id,
  progress: 0,
})

export type DownloadAlbumState = {
  album: Album | null,
  status: ActionStatus | CancelledActionStatus | null,
  pictures: EntityState<DownloadPicture>,
  thumbnails: EntityState<DownloadPicture>,
}

export const picturesAdapter = createEntityAdapter<DownloadPicture>()
export const thumbnailsAdapter = createEntityAdapter<DownloadPicture>()

const initialState: DownloadAlbumState = {
  album: null,
  status: null,
  pictures: picturesAdapter.getInitialState(),
  thumbnails: thumbnailsAdapter.getInitialState(),
}

export function downloadAlbumReducer(state = initialState, action: DownloadAlbumActions): DownloadAlbumState {
  switch (action.type) {
    case DownloadAlbumActionsTypes.DOWNLOAD_ALBUM: {
      const { album } =  action.payload
      const downloadPictures = album.pictures.map(({ id }) => getInitialDownloadPicture(id))

      return {
        ...state,
        album,
        status: ActionStatus.Pending,
        pictures: picturesAdapter.addAll(downloadPictures, picturesAdapter.getInitialState()),
        thumbnails: picturesAdapter.addAll(downloadPictures, thumbnailsAdapter.getInitialState()),
      }
    }

    case DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_SUCCESS:
      return {
        ...state,
        status: ActionStatus.Success,
      }

    case DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_PROGRESS: {
      const { pictureId: id, progress } = action.payload
      const pictures = picturesAdapter.updateOne({ id, changes: { progress } }, state.pictures)

      return { ...state, pictures }
    }

    case DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_PROGRESS: {
      const { pictureId: id, progress } = action.payload
      const thumbnails = thumbnailsAdapter.updateOne({ id, changes: { progress } }, state.thumbnails)

      return { ...state, thumbnails }
    }

    case DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_ERROR:
    case DownloadAlbumActionsTypes.DOWNLOAD_PICTURES_ERROR:
    case DownloadAlbumActionsTypes.DOWNLOAD_PICTURE_ERROR:
    case DownloadAlbumActionsTypes.DOWNLOAD_THUMBNAIL_ERROR:
      return {
        ...state,
        status: ActionStatus.Error,
      }

    case DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_CANCEL:
      return {
        ...state,
        status: CancelledActionStatus,
      }

    case DownloadAlbumActionsTypes.DOWNLOAD_ALBUM_CLEAR:
      return initialState

    default: {
      return state
    }
  }
}

const { selectAll: selectAllPictures } = picturesAdapter.getSelectors()
const { selectAll: selectAllThumbnails } = thumbnailsAdapter.getSelectors()

export const getDownloadAlbumProgress = (state: DownloadAlbumState) => {
  const allFiles = [...selectAllPictures(state.pictures), ...selectAllThumbnails(state.thumbnails)]

  return allFiles.length > 0
    ? Math.round(allFiles.reduce((acc, curr) => acc + curr.progress, 0) / allFiles.length)
    : 0
}
