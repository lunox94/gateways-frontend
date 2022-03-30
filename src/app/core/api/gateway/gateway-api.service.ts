import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gateway, GatewayToCreate } from '../../models/models';
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

    /**
     * Creates a new gateway.
     * @param gatewayToCreate Data to create a new gateway.
     * @returns An observable containing the newly created gateway.
     */
    post(gatewayToCreate: GatewayToCreate): Observable<Gateway> {
        return this._http.post<Gateway>(
            this._urlService.gatewayPost(),
            gatewayToCreate
        );
    }

    /**
     * Deletes a gateway given its uid.
     * @param uid The uid of the gateway to be deleted.
     * @returns An observable that emits once the request finishes.
     */
    delete(uid: string): Observable<any> {
        return this._http.delete(this._urlService.gatewayDelete(uid));
    }
}
