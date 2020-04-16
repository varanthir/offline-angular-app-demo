import { ActivatedRoute } from '@angular/router'
import { map, filter } from 'rxjs/operators'

export class OnlineAlbumViewerParams {
  readonly albumId$ = this.router.paramMap.pipe(
    map(paramsMap => paramsMap.get('albumId')),
    filter(albumId => albumId !== null),
    map(albumId => Number(albumId)),
  )

  constructor(private readonly router: ActivatedRoute) {}
}
