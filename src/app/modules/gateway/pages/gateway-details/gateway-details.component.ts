import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, merge, Observable, of, Subject } from 'rxjs';
import {
    filter,
    map,
    mapTo,
    mergeAll,
    shareReplay,
    startWith,
    switchMap,
    switchMapTo,
    take,
    tap,
    withLatestFrom,
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

    private readonly _editGatewayRequest = new Subject<void>();
    private readonly _deleteGatewayRequest = new Subject<void>();
    private readonly _createDeviceRequest = new Subject<void>();
    private readonly _editDeviceRequest = new Subject<Device>();
    private readonly _deleteDeviceRequest = new Subject<Device>();

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
        // Emits the uid of the gateway obtained from the route.
        this.gatewayUid$ = this._activatedRoute.paramMap.pipe(
            map((params) => params.get(GATEWAY_PARAM_UID)!),
            shareReplay(1)
        );

        // Gets the gateway after an uid from the route arrives.
        const gatewayLoad$ = this.gatewayUid$.pipe(switchMap(this._getGateway));

        // Open a drawer with the edit gateway form every time it is requested.
        // When the form is closed it will return a boolean that indicates whether
        // or not the gateway was updated.
        const afterEditClose$ = this._editGatewayRequest.pipe(
            switchMap(() => this.gateway$?.pipe(take(1) ?? of(null))),
            filter((gateway) => gateway !== null),
            switchMap(this._openEditGatewayForm)
        );

        // From this an observable will be created that emits
        // whenever is needed to re-fetch the gateway.
        const reloadGateway$ = afterEditClose$.pipe(
            filter<boolean>(Boolean),
            shareReplay(1)
        );

        // Reloads the gateway everytime is requested.
        const gatewayReloads$ = reloadGateway$.pipe(
            withLatestFrom(this.gatewayUid$),
            map(([_, uid]) => uid),
            switchMap(this._getGateway)
        );

        // From this an observable will be created that emits when
        // the gateway initially loads or when a reload is requested
        // i.e. the user edited the gateway.
        this.gateway$ = from([gatewayLoad$, gatewayReloads$]).pipe(
            mergeAll(),
            shareReplay(1)
        );

        // Listens to deletion requests and call the api to delete
        // the gateway every time a request arrive. Emits when the gateway
        // was deleted.
        const afterGatewayDelete$ = this._deleteGatewayRequest.pipe(
            withLatestFrom(this.gateway$),
            map(([_, gateway]) => gateway),
            switchMap(this._deleteGateway)
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
        const afterCreateClose$ = this._createDeviceRequest.pipe(
            withLatestFrom(this.gateway$),
            map(([_, gateway]) => gateway),
            switchMap(this._openCreateDeviceForm)
        );

        // Open a drawer with the edit device form every time it is requested.
        // When the form is closed it will return a boolean that indicates whether
        // or not the device was edited.
        const afterEditClose$ = this._editDeviceRequest.pipe(
            withLatestFrom(this.gateway$),
            switchMap(this._openEditDeviceForm)
        );

        // Emits when a device is deleted.
        const afterDeviceDelete$ = this._deleteDeviceRequest.pipe(
            withLatestFrom(this.gateway$),
            switchMap(this._deleteDevice),
            mapTo(true)
        );

        // From this an observable will be created that emits
        // whenever is needed to reload the devices list.
        const reloadDevices$ = from([
            afterCreateClose$,
            afterEditClose$,
            afterDeviceDelete$,
        ]).pipe(mergeAll(), filter<boolean>(Boolean), shareReplay(1));

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

        // Indicates that a request to delete a device has started.
        const deleteStarts$ = this._deleteDeviceRequest.pipe(mapTo(true));

        // Indicates that a request to load the devices has ended.
        const loadEnds$ = this.devices$.pipe(mapTo(false));

        // Build the loading state that indicates if the devices are being fetched.
        this.devicesLoading$ = from([
            loadStarts$,
            deleteStarts$,
            loadEnds$,
        ]).pipe(mergeAll(), shareReplay(1));
    }

    /**
     * Requests to open a drawer with the edit gateway form.
     */
    requestToEditGateway(): void {
        this._editGatewayRequest.next();
    }

    /**
     * Requests to delete the current gateway.
     */
    requestToDeleteGateway(): void {
        this._deleteGatewayRequest.next();
    }

    /**
     * Request to create a new device on the gateway.
     */
    requestToCreateDevice(): void {
        this._createDeviceRequest.next();
    }

    /**
     * Request to edit an existing device.
     * @param device The device to update.
     */
    requestToEditDevice(device: Device): void {
        this._editDeviceRequest.next(device);
    }

    /**
     * Request to delete an existing device.
     * @param device The device to delete.
     */
    requestToDeleteDevice(device: Device): void {
        this._deleteDeviceRequest.next(device);
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

    private readonly _openEditDeviceForm = ([device, gateway]: [
        Device,
        Gateway
    ]) =>
        this._globalDrawerService.openEditDeviceForm(gateway, device)
            .afterClose;

    private readonly _deleteDevice = ([device, gateway]: [Device, Gateway]) =>
        this._gatewayApiService.deleteDevice(gateway.uid, device.uid);
}
