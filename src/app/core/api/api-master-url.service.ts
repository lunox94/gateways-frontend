import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiMasterUrlService {
    readonly gatewayGetAll = () => `${environment.apiUrl}/gateways`;
    readonly gatewayGet = (uid: string) =>
        `${environment.apiUrl}/gateways/${uid}`;
    readonly gatewayPost = () => `${environment.apiUrl}/gateways`;
    readonly gatewayPut = (uid: string) =>
        `${environment.apiUrl}/gateways/${uid}`;
    readonly gatewayDelete = (uid: string) =>
        `${environment.apiUrl}/gateways/${uid}`;
    readonly deviceGetAll = (uid: string) =>
        `${environment.apiUrl}/gateways/${uid}/devices`;
    readonly devicePost = (uid: string) =>
        `${environment.apiUrl}/gateways/${uid}/devices`;
    readonly devicePut = (uid: string, duid: string) =>
        `${environment.apiUrl}/gateways/${uid}/devices/${duid}`;
}
