import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { map, filter } from 'rxjs/operators'
import { isPending, isError } from 'utils/ngrx/action-status'
import { DownloadAlbumFacadeService } from './state/download-album/download-album.facade'
import { Album } from './state/dal/dto/album'
import { MatDialog } from '@angular/material/dialog';
import { DownloadAlbumModalComponent } from './components/download-album-modal/download-album-modal.component'
import { AlbumsFacadeService } from './state/albums/albums.facade'
import { DeleteAlbumDialogComponent } from './components/delete-album-dialog/delete-album-dialog.component'
import { ContentScrollService } from 'app/services/content-scroll.service'
import { StorageEstimateFacadeService } from './state/storage-estimate/storage-estimate.facade'
import { toMemoryUnit } from 'utils/to-memory-unit'

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent implements OnInit {
  readonly albums$ = this.albumsFacade.albums$
  readonly hasAlbums$ = this.albums$.pipe(map(albums => albums.length > 0))
  readonly isAlbumsPending$ = this.albumsFacade.albumsStatus$.pipe(map(isPending))
  readonly isEmptyAlbumsPending$ = this.albumsFacade.emptyAlbumsPending$
  readonly isAlbumsError$ = this.albumsFacade.albumsStatus$.pipe(map(isError))
  readonly storageEstimate$ = this.storageEstimateFacade.state$

  constructor(
    private readonly albumsFacade: AlbumsFacadeService,
    private readonly downloadAlbumFacade: DownloadAlbumFacadeService,
    private readonly dialog: MatDialog,
    private readonly contentScroll: ContentScrollService,
    private readonly storageEstimateFacade: StorageEstimateFacadeService,
  ) {}

  ngOnInit(): void {
    this.contentScroll.scrollTop()
    this.getAlbums()
    this.getStorageEstimate()
  }

  getStorageEstimate(): void {
    this.storageEstimateFacade.getStorageEstimate()
  }

  getAlbums(): void {
    this.albumsFacade.getAlbums()
  }

  downloadAlbum(album: Album): void {
    DownloadAlbumModalComponent.open(this.dialog)
      .afterClosed()
      .subscribe(() => this.downloadAlbumFacade.downloadClear())

    this.downloadAlbumFacade.downloadAlbum(album)
  }

  deleteAlbum(albumId: number): void {
    DeleteAlbumDialogComponent.open(this.dialog)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.albumsFacade.deleteOfflineAlbum(albumId))
  }

  getFree({ usage, quota }: StorageEstimate): string {
    return usage !== undefined && quota !== undefined
      ? toMemoryUnit(quota - usage)
      : 'N/A'
  }

  getUsed({ usage }: StorageEstimate): string {
    return usage !== undefined ? toMemoryUnit(usage) : 'N/A'
  }

  getTotal({ quota }: StorageEstimate): string {
    return quota !== undefined ? toMemoryUnit(quota) : 'N/A'
  }
}
