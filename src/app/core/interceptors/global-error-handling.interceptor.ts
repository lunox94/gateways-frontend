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
import {
    CONNECTION_REFUSED_TOKEN,
    DETAILS_TOKEN,
} from 'src/app/modules/status-pages/pages/server-error/server-error.component';
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
                    } else if (error.status == 0) {
                        this._drawerService.drawerRef?.close();
                        const queryParams: any = {};
                        queryParams[DETAILS_TOKEN] = CONNECTION_REFUSED_TOKEN;
                        this._router.navigate(['status', 'server-error'], {
                            queryParams,
                        });
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
