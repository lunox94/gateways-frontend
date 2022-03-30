import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    Device,
    DeviceToCreate,
    DeviceToUpdate,
    Gateway,
    GatewayToCreate,
    GatewayToUpdate,
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
     * Gets all the devices for a gateway given its uid.
     * @param uid The uid of the gateway that owns the devices.
     * @returns The list of devices for the given gateway.
     */
    getAllDevices(uid: string): Observable<Device[]> {
        return this._http.get<Device[]>(this._urlService.deviceGetAll(uid));
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

    /**
     * Updates an existing device.
     * @param uid The uid of the gateway that owns the device.
     * @param duid The uid of the device to update.
     * @param deviceToUpdate Data to update the device.
     * @returns An observable that emits when the request finishes.
     */
    putDevice(
        uid: string,
        duid: number,
        deviceToUpdate: DeviceToUpdate
    ): Observable<any> {
        return this._http.put(
            this._urlService.devicePut(uid, duid),
            deviceToUpdate
        );
    }
}
