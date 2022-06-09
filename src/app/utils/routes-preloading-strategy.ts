import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


export class RoutesPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    const loadRoute = (delay: number) => delay
      ? timer(2000).pipe(mergeMap(_ => load()))
      : load();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}