import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mapTo, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import { Device, Gateway } from 'src/app/core/models/models';
import { GlobalDrawerService } from 'src/app/core/services/global-drawer.service';
import { GATEWAY_PARAM_UID } from '../../gateway.module';

@Component({
    templateUrl: './gateway-details.component.html',
})
export class GatewayDetailsComponent implements OnInit {
    gateway$!: Observable<Gateway>;

    loading$!: Observable<boolean>;

    gatewayUid$!: Observable<string>;

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _gatewayApiService: GatewayApiService
    ) {}

    ngOnInit(): void {
        this.gatewayUid$ = this._activatedRoute.paramMap.pipe(
            map((params) => params.get(GATEWAY_PARAM_UID)!),
            shareReplay(1)
        );

        this.gateway$ = this.gatewayUid$.pipe(
            switchMap((uid) => this._gatewayApiService.get(uid)),
            shareReplay(1)
        );

        this.loading$ = this.gateway$.pipe(
            mapTo(false),
            startWith(true),
            shareReplay(1)
        );
    }

    /** Opens a drawer with the form to edit the current gateway. */
    openEditGatewayForm(): void {
        // const ref = this._globalDrawerService.openEditGatewayForm(
        //     this.gateway!
        // );
    }

    /**
     * Opens a drawer with the form to create a device for the current
     * gateway. */
    openCreateDeviceForm(): void {
        // const ref = this._globalDrawerService.openCreateDeviceForm(
        //     this.gateway!
        // );
    }

    /**
     * Opens a drawer with the form to edit a device for the current
     * gateway. */
    openEditDeviceForm(device: Device): void {
        const ref = this._globalDrawerService.openEditDeviceForm(device);
    }

    /** Called when the user confirms he wants to delete the current gateway. */
    confirmDelete(): void {
        this._router.navigate(['gateways']);
    }
}
