import {Observable} from 'rxjs';

export function returnVoid() {
  return function <T>(source: Observable<T>): Observable<void> {
    return new Observable(subscriber =>
      source.subscribe({
        next() {
          subscriber.next(void 0);
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      })
    );
  };
}
