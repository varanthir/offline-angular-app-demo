import { toArrayBufferBlob } from './to-array-buffer-blob'

describe('toArrayBufferFile()', () => {
  it('should return Observable<ArrayBufferFile>', done => {
    const testArrayBuffer = new ArrayBuffer(1024 * 10)
    const blob = new Blob([testArrayBuffer], { type: '' })

    toArrayBufferBlob(blob).subscribe(
      ({ arrayBuffer, type }) => {
        expect(arrayBuffer.byteLength).toBe(testArrayBuffer.byteLength)
        expect(type).toBe(blob.type)
      },
      fail,
      done,
    )
  })

  it('should not finish if interrupted', () => {
    const testArrayBuffer = new ArrayBuffer(1024 * 10)
    const blob = new File([testArrayBuffer], 'test10kb.file2', { type: '' })

    const sub = toArrayBufferBlob(blob).subscribe(fail, fail, fail)
    sub.unsubscribe()
  })
})
