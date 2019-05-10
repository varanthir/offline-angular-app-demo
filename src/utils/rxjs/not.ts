import { map } from 'rxjs/operators'

export const not = map((value: boolean) => !value)
