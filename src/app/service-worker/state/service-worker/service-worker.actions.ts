import { Action } from '@ngrx/store'
import { checkTypes } from 'utils/ngrx/check-types'

export enum ServiceWorkerActionTypes {
  SHOW_IS_STABLE = '[ServiceWorker] SHOW_IS_STABLE',
  HIDE_IS_STABLE = '[ServiceWorker] HIDE_IS_STABLE',
  TOGGLE_IS_STABLE = '[ServiceWorker] TOGGLE_IS_STABLE',
}

checkTypes(ServiceWorkerActionTypes as any)

export class ShowIsStableAction implements Action {
  readonly type = ServiceWorkerActionTypes.SHOW_IS_STABLE
}

export class HideIsStableAction implements Action {
  readonly type = ServiceWorkerActionTypes.HIDE_IS_STABLE
}

export class ToggleIsStableAction implements Action {
  readonly type = ServiceWorkerActionTypes.TOGGLE_IS_STABLE
}


export type ServiceWorkerActions
  = ShowIsStableAction
  | HideIsStableAction
  | ToggleIsStableAction
