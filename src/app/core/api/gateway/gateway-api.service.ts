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

    getAll(): Observable<Gateway[]> {
        return this._http.get<Gateway[]>(this._urlService.gatewayGetAll());
    }
}
