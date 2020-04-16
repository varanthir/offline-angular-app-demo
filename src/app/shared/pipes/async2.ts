import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core'
import { Observable, Subscription } from 'rxjs'

@Pipe({ name: 'async2', pure: false })
export class Async2Pipe<T> implements OnDestroy, PipeTransform {
  private _$input: Observable<T> | null = null
  private _subscription: Subscription | null = null
  private _latestValue: T

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.unsubscribe()
  }

  transform($input: Observable<T>, fallbackValue: T): T {
    if (!this._$input) {
      this._latestValue = fallbackValue
      this.subscribe($input)
    }

    if (this._$input !== $input) {
      this._latestValue = fallbackValue
      this.unsubscribe()
      this.subscribe($input)
    }

    return this._latestValue
  }

  private unsubscribe(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  private subscribe($input: Observable<T>): void {
    this._$input = $input
    this._subscription = $input
      .subscribe(value => {
        this._latestValue = value
        this.cdRef.markForCheck()
      })
  }
}
