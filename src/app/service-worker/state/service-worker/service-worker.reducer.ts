import { ServiceWorkerActionTypes, ServiceWorkerActions } from './service-worker.actions'

export type ServiceWorkerState = {
  showIsStable: boolean
}

const initialState: ServiceWorkerState = {
  showIsStable: false
}

export function serviceWorkerReducer(state = initialState, action: ServiceWorkerActions): ServiceWorkerState {
  switch (action.type) {
    case ServiceWorkerActionTypes.SHOW_IS_STABLE:
      return { showIsStable: true }

    case ServiceWorkerActionTypes.HIDE_IS_STABLE:
      return { showIsStable: false }

    case ServiceWorkerActionTypes.TOGGLE_IS_STABLE:
      return { showIsStable: !state.showIsStable }

    default:
      return state
  }
}
