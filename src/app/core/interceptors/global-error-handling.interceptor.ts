import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalDrawerService } from '../services/global-drawer.service';

@Injectable()
export class GlobalErrorHandlingInterceptor implements HttpInterceptor {
    constructor(
        private _router: Router,
        private _drawerService: GlobalDrawerService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                // just doing a very simple error handling
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 404) {
                        this._drawerService.drawerRef?.close();
                        this._router.navigate(['status', 'not-found']);
                    } else {
                        this._drawerService.drawerRef?.close();
                        this._router.navigate(['status', 'server-error']);
                    }
                }
                return throwError(error);
            })
        );
    }
}
