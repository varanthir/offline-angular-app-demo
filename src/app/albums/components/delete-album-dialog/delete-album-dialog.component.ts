import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-album-dialog',
  templateUrl: './delete-album-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAlbumDialogComponent {
  public static open(dialog: MatDialog) {
    return dialog.open<DeleteAlbumDialogComponent, undefined, boolean>(DeleteAlbumDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      disableClose: true
    })
  }
}
