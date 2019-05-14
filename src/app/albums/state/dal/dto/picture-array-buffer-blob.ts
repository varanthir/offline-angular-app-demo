import { ArrayBufferBlob, toArrayBufferBlob } from 'utils/rxjs/to-array-buffer-blob'
import { map } from 'rxjs/operators'

interface PictureArrayBufferBlobObject extends ArrayBufferBlob {
  readonly id: number
}

export class PictureArrayBufferBlob implements ArrayBufferBlob {
  public static fromBlob(id: number, blob: Blob) {
    return toArrayBufferBlob(blob).pipe(
      map(({ arrayBuffer, type }) => new PictureArrayBufferBlob(id, arrayBuffer, type))
    )
  }

  public static fromObject({ id, arrayBuffer, type }: PictureArrayBufferBlobObject): PictureArrayBufferBlob {
    return new PictureArrayBufferBlob(id, arrayBuffer, type)
  }

  constructor(
    public readonly id: number,
    public readonly arrayBuffer: ArrayBuffer,
    public readonly type: string,
  ) {}
}
