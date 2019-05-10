import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { AlbumsFacadeService } from './state/albums/albums.facade'
import { map } from 'rxjs/operators'
import { mapIsPending, mapIsError } from 'utils/ngrx/action-status'
import { DownloadAlbumFacadeService } from './state/download-album/download-album.facade'
import { Album } from './state/dto/album'
import { MatDialog } from '@angular/material'
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent implements OnInit {
  public readonly albums$ = this.albumsFacade.albums$
  public readonly hasAlbums$ = this.albums$.pipe(map(albums => albums.length > 0))
  public readonly isAlbumsPending$ = this.albumsFacade.albumsStatus$.pipe(mapIsPending)
  public readonly isEmptyAlbumsPending$ = this.albumsFacade.emptyAlbumsPending$
  public readonly isAlbumsError$ = this.albumsFacade.albumsStatus$.pipe(mapIsError)

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly downloadAlbumFacade: DownloadAlbumFacadeService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.getAlbums()
  }

  public getAlbums(): void {
    this.albumsFacade.getAlbums()
  }

  public downloadAlbum(album: Album): void {
    DownloadAlbumModalComponent.open(this.dialog)
      .afterClosed()
      .subscribe(() => this.downloadAlbumFacade.downloadClear())

    this.downloadAlbumFacade.downloadAlbum(album)
  }
}
