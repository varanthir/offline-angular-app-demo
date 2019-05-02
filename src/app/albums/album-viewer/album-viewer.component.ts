import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AlbumsFacadeService } from '../state/facade.service'
import { first, switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { isError, isPending } from 'utils/ngrx/action-status'
import { Picture } from '../state/dto/picture'
import { AlbumViewerParams } from './album-viewer-params'

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss']
})
export class AlbumViewerComponent implements OnDestroy {
  public readonly isAlbumPending$ = this.albumsFacade.albumStatus$.pipe(isPending)
  public readonly isAlbumError$ = this.albumsFacade.albumStatus$.pipe(isError)
  public readonly params = new AlbumViewerParams(this.router)
  public readonly album$ = this.params.albumId$.pipe(
    switchMap(albumId => this.albumsFacade.albumById$(albumId)))

  private readonly getAlbumSub: Subscription = this.params.albumId$
    .subscribe(albumId => this.albumsFacade.getAlbum(albumId))

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly router: ActivatedRoute,
  ) {}

  public ngOnDestroy(): void {
    this.getAlbumSub.unsubscribe()
  }

  public getAlbum(): void {
    this.params.albumId$
      .pipe(first())
      .subscribe(albumId => this.albumsFacade.getAlbum(albumId))
  }

  public trackById(index: number, picture: Picture) {
    return picture.id
  }
}
