import { StorageEstimateActionsTypes, StorageEstimateActions } from './storage-estimate.actions'

export type StorageEstimateState = StorageEstimate | null
const initialState: StorageEstimateState = null

export function storageEstimateReducer(state = initialState, action: StorageEstimateActions): StorageEstimateState {
  switch (action.type) {
    case StorageEstimateActionsTypes.GET_STORAGE_ESTIMATE_SUCCESS:
      return action.payload.storageEstimate

    default: {
      return state
    }
  }
}
