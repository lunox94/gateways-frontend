import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GatewayToUpdate } from '../../models/gateway-to-update.model';
import {
    Device,
    DeviceToCreate,
    Gateway,
    GatewayToCreate,
} from '../../models/models';
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
     * Updates a gateway.
     * @param uid The uid of the gateway to update.
     * @param gatewayToUpdate Data to update the gateway.
     * @returns An observable that emits once the request finishes.
     */
    put(uid: string, gatewayToUpdate: GatewayToUpdate): Observable<any> {
        return this._http.put(
            this._urlService.gatewayPut(uid),
            gatewayToUpdate
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

    /**
     * Creates a new device.
     * @param uid The uid of the gateway that will own the device.
     * @param deviceToCreate Data to create the device.
     * @returns An observable that contains the newly created device.
     */
    postDevice(
        uid: string,
        deviceToCreate: DeviceToCreate
    ): Observable<Device> {
        return this._http.post<Device>(
            this._urlService.devicePost(uid),
            deviceToCreate
        );
    }
}
