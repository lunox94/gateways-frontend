import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const DETAILS_TOKEN = 'details';
export const CONNECTION_REFUSED_TOKEN = 'err_connection_refused';
const CONNECTION_REFUSED_MESSAGE = 'Sorry, cannot connect to server.';
const GENERAL_ERROR_MESSAGE = 'Sorry, there is an error on server.';

@Component({
    selector: 'app-server-error',
    templateUrl: './server-error.component.html',
})
export class ServerErrorComponent implements OnInit {
    details!: string | null;

    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.details =
            this._activatedRoute.snapshot.queryParamMap.get(DETAILS_TOKEN);
    }

    getErrorMessage(): string {
        return this.details === CONNECTION_REFUSED_TOKEN
            ? CONNECTION_REFUSED_MESSAGE
            : GENERAL_ERROR_MESSAGE;
    }
}
