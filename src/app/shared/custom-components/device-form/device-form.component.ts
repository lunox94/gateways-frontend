import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import {
    Device,
    DeviceStatus,
    DeviceToCreate,
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
    loading$: Observable<boolean>;

    /** Possible device statuses. */
    readonly _statusEnum = DeviceStatus;

    constructor(
        private _drawerRef: NzDrawerRef<DeviceFormComponent>,
        private _fb: FormBuilder,
        private _gatewayApiService: GatewayApiService
    ) {
        // set up state management for this component
        this._loadingController = new Subject();
        this.loading$ = this._loadingController.asObservable();
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            vendor: [this.device?.vendor, [Validators.required]],
            status: [this.device?.status, [Validators.required]],
        });
    }

    /** Closes the drawer. */
    close(): void {
        this._drawerRef.close(false);
    }

    /** Called when the submit but is clicked. */
    onSubmit(): void {
        if (this.form!.valid) {
            // submit data
            this._loadingController.next(true);

            // if there is no device then the form was open to create a device
            if (!this.device) {
                const deviceToCreate: DeviceToCreate = this.form.value;
                this._gatewayApiService
                    .postDevice(this.gatewayUid, deviceToCreate)
                    .pipe(take(1))
                    .subscribe((_) => this._drawerRef.close(true));
            }
        } else {
            Object.values(this.form!.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
}
