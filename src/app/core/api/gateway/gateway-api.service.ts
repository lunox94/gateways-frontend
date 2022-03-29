import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gateway } from '../../models/models';
import { ApiMasterUrlService } from '../api-master-url.service';

@Injectable({
    providedIn: 'root',
})
export class GatewayApiService {
    constructor(
        private _http: HttpClient,
        private _urlService: ApiMasterUrlService
    ) {}

    /**
     * Gets all gateways.
     * @returns An observable containing a list with all gateways.
     */
    getAll(): Observable<Gateway[]> {
        return this._http.get<Gateway[]>(this._urlService.gatewayGetAll());
    }

    /**
     * Gets a gateway by its uid.
     * @param uid The gateway's uid.
     * @returns An observable with the requested gateway.
     */
    get(uid: string): Observable<Gateway> {
        return this._http.get<Gateway>(this._urlService.gatewayGet(uid));
    }
}
