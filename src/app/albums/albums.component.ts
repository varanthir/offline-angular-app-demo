import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { map, filter } from 'rxjs/operators'
import { isPending, isError } from 'utils/ngrx/action-status'
import { DownloadAlbumFacadeService } from './state/download-album/download-album.facade'
import { Album } from './state/dal/dto/album'
import { MatDialog } from '@angular/material'
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'
import { AlbumsFacadeService } from './state/albums/albums.facade'
import { DeleteAlbumDialogComponent } from './components/delete-album-dialog/delete-album-dialog.component'
import { ContentScrollService } from 'app/services/content-scroll.service'

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent implements OnInit {
  public readonly albums$ = this.albumsFacade.albums$
  public readonly hasAlbums$ = this.albums$.pipe(map(albums => albums.length > 0))
  public readonly isAlbumsPending$ = this.albumsFacade.albumsStatus$.pipe(map(isPending))
  public readonly isEmptyAlbumsPending$ = this.albumsFacade.emptyAlbumsPending$
  public readonly isAlbumsError$ = this.albumsFacade.albumsStatus$.pipe(map(isError))

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly downloadAlbumFacade: DownloadAlbumFacadeService,
    private readonly dialog: MatDialog,
    private readonly contentScroll: ContentScrollService,
  ) {}

  public ngOnInit(): void {
    this.contentScroll.scrollTop()
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

  public deleteAlbum(albumId: number): void {
    DeleteAlbumDialogComponent.open(this.dialog)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.albumsFacade.deleteOfflineAlbum(albumId))
  }
}
