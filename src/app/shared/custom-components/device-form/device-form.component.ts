import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { from, Observable, Subject, timer } from 'rxjs';
import {
    mapTo,
    mergeAll,
    shareReplay,
    switchMap,
    take,
    tap,
} from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import {
    Device,
    DeviceStatus,
    DeviceToCreate,
    DeviceToUpdate,
} from 'src/app/core/models/models';

@Component({
    selector: 'app-device-form',
    templateUrl: './device-form.component.html',
})
export class DeviceFormComponent implements OnInit {
    /**
     * Optional device to edit. This property defines
     * whether this form is to create a new device
     * (no device is passed) or to edit an existing device
     * (if a device is passed).
     */
    @Input() device?: Device;

    /** The uid of the gateway that owns the device. */
    @Input() gatewayUid!: string;

    /** Form with the fields to create or edit a device. */
    form!: FormGroup;

    /** Controller to emit the loading state values. */
    private _loadingController: Subject<boolean>;

    /** Whether or not the component is performing an API call. */
    loading$!: Observable<boolean>;

    private readonly _createDeviceRequest = new Subject<{
        uid: string;
        deviceToCreate: DeviceToCreate;
    }>();
    private readonly _updateDeviceRequest = new Subject<{
        uid: string;
        duid: number;
        deviceToUpdate: DeviceToUpdate;
    }>();

    /** Possible device statuses. */
    readonly _statusEnum = DeviceStatus;

    constructor(
        private _drawerRef: NzDrawerRef<DeviceFormComponent>,
        private _fb: FormBuilder,
        private _gatewayApiService: GatewayApiService
    ) {
        // set up state management for this component
        this._loadingController = new Subject();
    }

    ngOnInit(): void {
        // create the form
        this.form = this._fb.group({
            vendor: [this.device?.vendor, [Validators.required]],
            status: [this.device?.status, [Validators.required]],
        });

        // emits when a request to create a device is triggered
        const afterDeviceCreate$ = this._createDeviceRequest.pipe(
            switchMap(this._createDevice),
            tap((_) => this._drawerRef.close(true))
        );

        // emits when a request to update a device is triggered
        const afterDeviceUpdate$ = this._updateDeviceRequest.pipe(
            switchMap(this._updateDevice),
            tap((_) => this._drawerRef.close(true))
        );

        // indicates that a request to create or update a device has started
        const loadStart$ = from([
            this._createDeviceRequest,
            this._updateDeviceRequest,
        ]).pipe(mergeAll(), mapTo(true));

        // indicates that a request to create or update a device has ended
        const loadEnd$ = from([afterDeviceCreate$, afterDeviceUpdate$]).pipe(
            mergeAll(),
            mapTo(false)
        );

        // indicates whether a device is being created / updated
        this.loading$ = from([loadStart$, loadEnd$]).pipe(
            mergeAll(),
            shareReplay(1)
        );
    }

    /** Closes the drawer. */
    close(): void {
        this._drawerRef.close(false);
    }

    /** Called when the submit but is clicked. */
    onSubmit(): void {
        if (this.form!.valid) {
            // submit data

            // if there is no device then the form was open to create a device
            if (!this.device) {
                const deviceToCreate: DeviceToCreate = this.form.value;
                // request to create a device
                this._createDeviceRequest.next({
                    uid: this.gatewayUid,
                    deviceToCreate,
                });
            } else {
                // else then this form was open to edit a device
                const deviceToUpdate: DeviceToUpdate = this.form.value;
                // request to update a device
                this._updateDeviceRequest.next({
                    uid: this.gatewayUid,
                    duid: this.device!.uid,
                    deviceToUpdate,
                });
            }
        } else {
            // if form is invalid then show validation errors in the UI
            Object.values(this.form!.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    private readonly _createDevice = ({
        uid,
        deviceToCreate,
    }: {
        uid: string;
        deviceToCreate: DeviceToCreate;
    }) => this._gatewayApiService.postDevice(uid, deviceToCreate);

    private readonly _updateDevice = ({
        uid,
        duid,
        deviceToUpdate,
    }: {
        uid: string;
        duid: number;
        deviceToUpdate: DeviceToUpdate;
    }) => this._gatewayApiService.putDevice(uid, duid, deviceToUpdate);
}
