import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import { Gateway } from 'src/app/core/models/models';
import { GlobalDrawerService } from 'src/app/core/services/global-drawer.service';

@Component({
    templateUrl: './gateway-list.component.html',
})
export class GatewayListComponent implements OnInit {
    gateways$!: Observable<Gateway[]>;

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _gatewayApiService: GatewayApiService
    ) {}

    ngOnInit(): void {
        this.gateways$ = this._gatewayApiService.getAll().pipe(shareReplay(1));
    }

    /** Opens the drawer with the create gateway form. */
    openCreateForm(): void {
        const ref = this._globalDrawerService.openCreateGatewayForm();
    }
}
