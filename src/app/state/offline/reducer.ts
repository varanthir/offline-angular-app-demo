import { Action } from '@ngrx/store'

export type OfflineState = boolean

const initialState: OfflineState = false

export function offlineReducer(state = initialState, action: Action): OfflineState {
  switch (action.type) {
    default: {
      return state
    }
  }
}
