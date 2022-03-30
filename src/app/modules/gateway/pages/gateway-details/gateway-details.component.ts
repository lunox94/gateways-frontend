import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import {
    filter,
    map,
    mapTo,
    shareReplay,
    startWith,
    switchMap,
    switchMapTo,
} from 'rxjs/operators';
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

    private readonly _updateGatewayRequest = new Subject<Gateway>();

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _gatewayApiService: GatewayApiService
    ) {}

    ngOnInit(): void {
        const afterUpdateGatewayClose$ = this._updateGatewayRequest.pipe(
            switchMap(this._openEditGatewayForm)
        );

        const reloadGateway$ = afterUpdateGatewayClose$.pipe(
            filter<boolean>(Boolean),
            shareReplay(1)
        );

        this.gatewayUid$ = this._activatedRoute.paramMap.pipe(
            map((params) => params.get(GATEWAY_PARAM_UID)!),
            shareReplay(1)
        );

        this.gateway$ = reloadGateway$.pipe(
            startWith(true),
            switchMapTo(this.gatewayUid$),
            switchMap(this._getGateway),
            shareReplay(1)
        );

        const loadStarts$ = reloadGateway$.pipe(startWith(true), mapTo(true));
        const loadEnds$ = this.gateway$.pipe(mapTo(false));

        this.loading$ = merge(loadStarts$, loadEnds$).pipe(shareReplay(1));
    }

    requestToEditGateway(gateway: Gateway) {
        this._updateGatewayRequest.next(gateway);
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

    private readonly _openEditGatewayForm = (gateway: Gateway) =>
        this._globalDrawerService.openEditGatewayForm(gateway).afterClose;

    private readonly _getGateway = (uid: string) =>
        this._gatewayApiService.get(uid);
}
