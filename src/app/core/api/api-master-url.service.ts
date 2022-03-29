import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiMasterUrlService {
    readonly gatewayGetAll = () => `${environment.apiUrl}/gateways`;
    readonly gatewayGet = (uid: string) =>
        `${environment.apiUrl}/gateways/${uid}`;
}
