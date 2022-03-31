import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
    CONNECTION_REFUSED_TOKEN,
    DETAILS_TOKEN,
} from 'src/app/modules/status-pages/pages/server-error/server-error.component';
import { AppError, BadRequestError, NotFoundError } from '../errors/app-errors';
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
                // skipping error 422 handling
                if (error instanceof HttpErrorResponse) {
                    if (error.status == HttpStatusCode.NotFound) {
                        this._drawerService.drawerRef?.close();
                        this._router.navigate(['status', 'not-found']);
                        return throwError(
                            new NotFoundError(error.error.message)
                        );
                    } else if (error.status == HttpStatusCode.BadRequest) {
                        return throwError(
                            new BadRequestError(error.error.message)
                        );
                    } else if (error.status == 0) {
                        this._drawerService.drawerRef?.close();
                        const queryParams: any = {};
                        queryParams[DETAILS_TOKEN] = CONNECTION_REFUSED_TOKEN;
                        this._router.navigate(['status', 'server-error'], {
                            queryParams,
                        });
                        return throwError(new AppError(error.error.message));
                    } else {
                        this._drawerService.drawerRef?.close();
                        this._router.navigate(['status', 'server-error']);
                        const message = error.error.message;
                        const messageProcessed = Array.isArray(message)
                            ? message.join()
                            : message;
                        return throwError(new AppError(messageProcessed));
                    }
                }
                return throwError(error);
            })
        );
    }
}
