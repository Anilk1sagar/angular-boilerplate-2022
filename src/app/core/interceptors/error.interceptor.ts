import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    // private authServ: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let copiedReq = req.clone();
    let headers = req.headers;

    const token = `this.authServ.getToken()`;
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    if (req.method === 'GET') {
      headers = headers.append('Cache-Control', ['no-cache', 'no-store', 'must-revalidate']);
      headers = headers.append('Pragma', 'no-cache');
    }
    copiedReq = req.clone({ headers: headers })

    return next.handle(copiedReq).pipe(
      catchError((error: any) => {
        if (error.error?.status_code == 401 || error.status == 401) {
          // this.authServ.logOutUser();
        }
        return throwError(error);
      })
    );
  }
}
