import { map } from 'rxjs/operators'

export function mapArray<T, R>(fn: (value: T) => R) {
  return map((arr: T[]) => arr.map(fn))
}
