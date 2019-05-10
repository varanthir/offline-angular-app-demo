import { Component, ChangeDetectionStrategy } from '@angular/core'
import { DownloadAlbumFacadeService } from 'app/albums/state/download-album/download-album.facade'
import { mapIsPending, mapIsError, mapIsCancelled } from 'utils/ngrx/action-status'
import { not } from 'utils/rxjs/not';
import { MatDialog } from '@angular/material';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-download-album-modal',
  templateUrl: './download-album-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadAlbumModalComponent {
  public static open(dialog: MatDialog) {
    return dialog.open(DownloadAlbumModalComponent, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: true
    })
  }

  public readonly album$ = this.downloadAlbumFacade.downloadAlbumEntity$
  public readonly progress$ = this.downloadAlbumFacade.downloadAlbumProgress$.pipe(auditTime(250))
  public readonly showCancelButton$ = this.downloadAlbumFacade.downloadAlbumStatus$.pipe(mapIsPending)
  public readonly showOkButton$ = this.showCancelButton$.pipe(not)
  public readonly showError$ = this.downloadAlbumFacade.downloadAlbumStatus$.pipe(mapIsError)
  public readonly showCancelled$ = this.downloadAlbumFacade.downloadAlbumStatus$.pipe(mapIsCancelled)

  constructor(private readonly downloadAlbumFacade: DownloadAlbumFacadeService) {}

  public cancel(): void {
    this.downloadAlbumFacade.downloadCancel()
  }
}
