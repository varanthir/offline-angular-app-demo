import { Observable } from 'rxjs';
import { HttpProgressEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

function calculatePercentageProgress({ loaded, total }: HttpProgressEvent): number {
  return total ? Math.round(loaded / total * 100) : 0
}

export function trackProgress<T>() {
  return (source: Observable<HttpProgressEvent | HttpResponse<T>>) => source.pipe(
    filter(httpEvent => httpEvent.type === HttpEventType.DownloadProgress || httpEvent.type === HttpEventType.Response),
    map(httpEvent => httpEvent.type === HttpEventType.Response
      ? httpEvent.body
      : calculatePercentageProgress(httpEvent),
    ),
    distinctUntilChanged(),
  )
}
