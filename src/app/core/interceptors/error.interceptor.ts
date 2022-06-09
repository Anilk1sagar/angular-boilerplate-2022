import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retryWhen((error) => {
        const maxRetries = 2;
        const delayMs = 2000;

        return error.pipe(
          mergeMap((error, index) => {
            if (index < maxRetries && error.status == 500) {
              return of(error).pipe(delay(delayMs));
            }

            throw error;
          })
        );
      })
    );
  }
}
