import { Injectable } from '@angular/core';
import { Observable, merge, of, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const MOBILE_MAX_WIDTH = 480; // px

@Injectable()
export class ScreenService {
  private readonly windowResize$: Observable<{}> = merge(
    of({}),
    fromEvent(window, 'resize').pipe(
      debounceTime(50))
  );

  public readonly isMobile$: Observable<boolean> = this.windowResize$.pipe(
    map(() => this.isMobile));

  public get isMobile(): boolean {
    return window.innerWidth <= MOBILE_MAX_WIDTH;
  }
}
