import { Observable } from 'rxjs'

export interface ArrayBufferBlob {
  arrayBuffer: ArrayBuffer,
  type: string,
}

export function toArrayBufferBlob(blob: Blob): Observable<ArrayBufferBlob> {
  return new Observable(observer => {
    const fileReader = new FileReader()

    fileReader.onabort = () => {
      observer.error(fileReader.error)
    }

    fileReader.onerror = () => {
      observer.error(fileReader.error)
    }

    fileReader.onload = () => {
      observer.next({
        arrayBuffer: fileReader.result as ArrayBuffer,
        type: blob.type,
      })
    }

    fileReader.onloadend = () => {
      observer.complete()
    }

    fileReader.readAsArrayBuffer(blob)

    return () => {
      fileReader.abort()
    }
  })
}
