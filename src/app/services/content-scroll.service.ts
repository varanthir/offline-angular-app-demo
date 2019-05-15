import { Injectable } from '@angular/core'

@Injectable()
export class ContentScrollService {
  // TODO: Consider better way to scroll to the top on changing route
  private _element: HTMLElement | null = null

  public registerElement(element: HTMLElement): void {
    this._element = element
  }

  public removeElement(): void {
    this._element = null
  }

  public scrollTop(): void {
    if(this._element) {
      this._element.scrollTop = 0
    }
  }
}
