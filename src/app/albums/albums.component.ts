import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { map } from 'rxjs/operators'
import { mapIsPending, mapIsError } from 'utils/ngrx/action-status'
import { DownloadAlbumFacadeService } from './state/download-album/download-album.facade'
import { Album } from './state/dal/dto/album'
import { MatDialog } from '@angular/material'
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'
import { OnlineAlbumsFacadeService } from './state/albums/online-albums/online-albums.facade';
import { OfflineAlbumsFacadeService } from './state/albums/offline-albums/offline-albums.facade';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent implements OnInit {
  public readonly albums$ = this.onlineAlbumsFacade.albums$
  public readonly hasAlbums$ = this.albums$.pipe(map(albums => albums.length > 0))
  public readonly isAlbumsPending$ = this.onlineAlbumsFacade.albumsStatus$.pipe(mapIsPending)
  public readonly isEmptyAlbumsPending$ = this.onlineAlbumsFacade.emptyAlbumsPending$
  public readonly isAlbumsError$ = this.onlineAlbumsFacade.albumsStatus$.pipe(mapIsError)

  constructor(
    private readonly onlineAlbumsFacade: OnlineAlbumsFacadeService,
    private readonly offlineAlbumsFacade: OfflineAlbumsFacadeService,
    private readonly downloadAlbumFacade: DownloadAlbumFacadeService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.getAlbums()
  }

  public getAlbums(): void {
    this.onlineAlbumsFacade.getAlbums()
    this.offlineAlbumsFacade.getAlbums()
  }

  public downloadAlbum(album: Album): void {
    DownloadAlbumModalComponent.open(this.dialog)
      .afterClosed()
      .subscribe(() => this.downloadAlbumFacade.downloadClear())

    this.downloadAlbumFacade.downloadAlbum(album)
  }
}
