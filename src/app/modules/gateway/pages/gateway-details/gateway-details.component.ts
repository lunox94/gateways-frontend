import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, merge, Observable, Subject } from 'rxjs';
import {
    filter,
    map,
    mapTo,
    mergeAll,
    shareReplay,
    startWith,
    switchMap,
    switchMapTo,
    tap,
} from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import { Device, Gateway } from 'src/app/core/models/models';
import { GlobalDrawerService } from 'src/app/core/services/global-drawer.service';
import { GATEWAY_PARAM_UID } from '../../gateway.module';

@Component({
    templateUrl: './gateway-details.component.html',
})
export class GatewayDetailsComponent implements OnInit {
    /** Emits the current gateway when loads the first time and on every update. */
    gateway$!: Observable<Gateway>;

    /** Emits the list of devices the current gateway owns. */
    devices$!: Observable<Device[]>;

    /** Emits a component-scoped loading state. */
    loading$!: Observable<boolean>;

    /** Emits a loading state that indicates if the devices are being loading. */
    devicesLoading$!: Observable<boolean>;

    /** Emits the uid of the gateway gotten from the route. */
    gatewayUid$!: Observable<string>;

    private readonly _updateGatewayRequest = new Subject<Gateway>();
    private readonly _deleteGatewayRequest = new Subject<Gateway>();
    private readonly _createDeviceRequest = new Subject<Gateway>();

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _gatewayApiService: GatewayApiService
    ) {}

    ngOnInit(): void {
        this._setUpGatewayStateManagement();

        this._setUpDevicesStateManagement();
    }

    private _setUpGatewayStateManagement() {
        // Open a drawer with the edit gateway form every time it is requested.
        // When the form is closed it will return a boolean that indicates whether
        // or not the gateway was updated.
        const afterClose$ = this._updateGatewayRequest.pipe(
            switchMap(this._openEditGatewayForm)
        );

        // From this an observable will be created that emits
        // whenever is needed to re-fetch the gateway.
        const reloadGateway$ = afterClose$.pipe(
            filter<boolean>(Boolean),
            shareReplay(1)
        );

        // Emits the uid of the gateway gotten from the route.
        this.gatewayUid$ = this._activatedRoute.paramMap.pipe(
            map((params) => params.get(GATEWAY_PARAM_UID)!),
            shareReplay(1)
        );

        // Emits the gateway data.
        this.gateway$ = reloadGateway$.pipe(
            startWith(true),
            switchMapTo(this.gatewayUid$),
            switchMap(this._getGateway),
            shareReplay(1)
        );

        // Emits when the gateway was deleted.
        const afterGatewayDelete$ = this._deleteGatewayRequest.pipe(
            switchMap(this._deleteGateway),
            mapTo(true)
        );

        // Indicates that a request to load the gateway has started.
        const loadStarts$ = reloadGateway$.pipe(startWith(true), mapTo(true));

        // Indicates that a request to delete the current gateway has started.
        const deleteStarts$ = this._deleteGatewayRequest.pipe(mapTo(true));

        // Indicates that a request to load the gateway has ended.
        const loadEnds$ = this.gateway$.pipe(mapTo(false));

        // Indicates that a request to delete the current gateway has ended.
        const deleteEnds$ = afterGatewayDelete$.pipe(
            tap((_) => this._router.navigate(['gateways'])),
            mapTo(false)
        );

        // Build the loading state that indicates if the gateway is being fetched.
        this.loading$ = from([
            loadStarts$,
            deleteStarts$,
            loadEnds$,
            deleteEnds$,
        ]).pipe(mergeAll(), shareReplay(1));
    }

    private _setUpDevicesStateManagement() {
        // Open a drawer with the create device form every time it is requested.
        // When the form is closed it will return a boolean that indicates whether
        // or not the device was created.
        const afterClose$ = this._createDeviceRequest.pipe(
            switchMap(this._openCreateDeviceForm)
        );

        // From this an observable will be created that emits
        // whenever is needed to reload the devices list.
        const reloadDevices$ = afterClose$.pipe(
            filter<boolean>(Boolean),
            shareReplay(1)
        );

        // There are two ways to get the devices, from the gateway itself
        // and from a dedicated API. In this observable we get the devices
        // from the gateway.
        const devices$ = this.gateway$.pipe(map((g) => g.devices));

        // In this observable we get the devices from the dedicated API.
        // The observable will emit every time a request to load the devices
        // is emited.
        const devicesReloaded$ = reloadDevices$.pipe(
            switchMapTo(this.gatewayUid$),
            switchMap(this._getAllDevices)
        );

        // Build the final observable with the devices from the two sources.
        this.devices$ = merge(devices$, devicesReloaded$).pipe(shareReplay(1));

        // Indicates that a request to load the devices has started.
        const loadStarts$ = reloadDevices$.pipe(mapTo(true));

        // Indicates that a request to load the devices has ended.
        const loadEnds$ = this.devices$.pipe(mapTo(false));

        // Build the loading state that indicates if the devices are being fetched.
        this.devicesLoading$ = from([loadStarts$, loadEnds$]).pipe(
            mergeAll(),
            shareReplay(1)
        );
    }

    /**
     * Requests to open a drawer with the edit gateway form.
     * @param gateway The gateway to update.
     */
    requestToEditGateway(gateway: Gateway): void {
        this._updateGatewayRequest.next(gateway);
    }

    /**
     * Requests to delete a gateway.
     * @param gateway The gateway to delete.
     */
    requestToDeleteGateway(gateway: Gateway): void {
        this._deleteGatewayRequest.next(gateway);
    }

    /**
     * Request to create a new device on the gateway.
     * @param gateway The gateway that will own the device.
     */
    requestToCreateDevice(gateway: Gateway): void {
        this._createDeviceRequest.next(gateway);
    }

    /**
     * Opens a drawer with the form to edit a device for the current
     * gateway. */
    openEditDeviceForm(device: Device): void {
        const ref = this._globalDrawerService.openEditDeviceForm(device);
    }

    private readonly _openEditGatewayForm = (gateway: Gateway) =>
        this._globalDrawerService.openEditGatewayForm(gateway).afterClose;

    private readonly _getGateway = (uid: string) =>
        this._gatewayApiService.get(uid);

    private readonly _deleteGateway = ({ uid }: Gateway) =>
        this._gatewayApiService.delete(uid);

    private readonly _getAllDevices = (uid: string) =>
        this._gatewayApiService.getAllDevices(uid);

    private readonly _openCreateDeviceForm = (gateway: Gateway) =>
        this._globalDrawerService.openCreateDeviceForm(gateway).afterClose;
}
