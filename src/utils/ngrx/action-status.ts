export enum ActionStatus {
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export const CancelledActionStatus = 'Cancelled'
export type CancelledActionStatus = typeof CancelledActionStatus

export const isPending = (status: ActionStatus) => status === ActionStatus.Pending
export const isError = (status: ActionStatus) => status === ActionStatus.Error
export const isCancelled = (status: CancelledActionStatus) => status === CancelledActionStatus
