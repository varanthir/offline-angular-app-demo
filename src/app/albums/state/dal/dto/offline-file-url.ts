import { SafeUrl } from '@angular/platform-browser'

export class OfflineFileUrl {
  constructor(
    public readonly id: number,
    public readonly url: string,
    public readonly safeUrl: SafeUrl,
  ) {}
}
