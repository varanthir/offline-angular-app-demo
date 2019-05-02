import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { AlbumsFacadeService } from './state/facade.service'
import { filter } from 'rxjs/operators';
import { isPending, isError } from 'utils/ngrx/action-status';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent implements OnInit {
  public readonly albums$ = this.albumsFacade.albums$
  public readonly isAlbumsPending$ = this.albumsFacade.albumsStatus$.pipe(isPending)
  public readonly isEmptyAlbumsPending$ = this.albumsFacade.emptyAlbumsPending$
  public readonly isAlbumsError$ = this.albumsFacade.albumsStatus$.pipe(isError)

  constructor(private readonly albumsFacade: AlbumsFacadeService) {}

  public ngOnInit(): void {
    this.getAlbums()
  }

  public getAlbums(): void {
    this.albumsFacade.getAlbums()
  }
}
