import { toArrayBufferFile } from './to-array-buffer-file';

describe('toArrayBufferFile()', () => {
  it('should return Observable<ArrayBufferFile>', done => {
    const testArrayBuffer = new ArrayBuffer(1024 * 10);
    const file = new File([testArrayBuffer], 'test10kb.file1', { type: '' });

    toArrayBufferFile(file).subscribe(
      ({ arrayBuffer, type, name }) => {
        expect(arrayBuffer.byteLength).toBe(testArrayBuffer.byteLength);
        expect(type).toBe(file.type);
        expect(name).toBe(file.name);
      },
      fail,
      done,
    );
  });

  it('should not finish if interrupted', () => {
    const testArrayBuffer = new ArrayBuffer(1024 * 10);
    const file = new File([testArrayBuffer], 'test10kb.file2', { type: '' });

    const sub = toArrayBufferFile(file).subscribe(fail, fail, fail);
    sub.unsubscribe();
  });
});
