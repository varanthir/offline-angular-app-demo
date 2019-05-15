import { Injectable } from '@angular/core'

@Injectable()
export class ContentScrollService {
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
