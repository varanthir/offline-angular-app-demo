import { Injectable } from '@angular/core'

@Injectable()
export class ContentScrollService {
  // TODO: Consider better way to scroll to the top on changing route
  private _element: HTMLElement | null = null

  registerElement(element: HTMLElement): void {
    this._element = element
  }

  removeElement(): void {
    this._element = null
  }

  scrollTop(): void {
    if(this._element) {
      this._element.scrollTop = 0
    }
  }
}
