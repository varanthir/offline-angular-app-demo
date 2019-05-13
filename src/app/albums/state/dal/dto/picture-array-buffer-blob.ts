import { ArrayBufferBlob, toArrayBufferBlob } from 'utils/rxjs/to-array-buffer-blob'
import { map } from 'rxjs/operators';

export class PictureArrayBufferBlob implements ArrayBufferBlob {
  public static from(id: number, blob: Blob) {
    return toArrayBufferBlob(blob).pipe(
      map(({ arrayBuffer, type }) => new PictureArrayBufferBlob(id, arrayBuffer, type))
    )
  }

  constructor(
    public readonly id: number,
    public readonly arrayBuffer: ArrayBuffer,
    public readonly type: string,
  ) {}
}
