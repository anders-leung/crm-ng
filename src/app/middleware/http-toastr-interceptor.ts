import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpToastrInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            this.handleSuccess(req);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error, req);
        let data = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        return throwError(error);
      }));
  }

  private handleSuccess(req: HttpRequest<any>) {
    const { action, which, what } = this.parseReq(req);
    if (action === 'get' || which === 'Auth') return;
    const capitalizedAction = action.replace(/^\w/, x => x.toUpperCase());

    this.toastr.success(`${capitalizedAction}d ${which}`);
  }

  private handleError(err: HttpErrorResponse, req: HttpRequest<any>) {
    if (err.error instanceof ErrorEvent) {
      console.error('Client side or network error: ', err.error.message);
      return throwError(err.error.message);
    } else {
      const { action, which, what } = this.parseReq(req);
      if (which !== 'Auth') this.toastr.error(`Failed to ${action} ${which}`, err.error.message);
      return throwError(err);
    }
  }

  private parseReq(req) {
    const { method, url } = req;
    const action = this.getAction(method);
    const [which, what] = this.parseUrl(url);
    return { action, which, what };
  }

  private parseUrl(url) {
    const tokens = url.split('5200/');
    let [which, what] = tokens[1].split('/');

    const uppercase = ['t1', 't2', 'nr'];
    if (uppercase.includes(which)) {
      which = which.toUpperCase();
    } else {
      which = which.replace(/^\w/, x => x.toUpperCase());
    }

    // ie. /clients/client -> remove what
    if (what && which.toLowerCase().includes(what.toLowerCase())) {
      what = undefined;
    }

    return [which, what];
  }

  private getAction(method) {
    let action = 'save';
    if (method === 'GET') action = 'get';
    if (method === 'PUT') action = 'update';
    if (method === 'DELETE') action = 'delete'
    return action;
  }
}