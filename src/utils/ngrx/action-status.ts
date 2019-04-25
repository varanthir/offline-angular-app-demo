import { map } from 'rxjs/operators';

export enum ActionStatus {
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export const isPending = map((status: ActionStatus | null) => status === ActionStatus.Pending)
