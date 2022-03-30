import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import {
    Gateway,
    GatewayToCreate,
    GatewayToUpdate,
} from 'src/app/core/models/models';
import { ipv4 } from 'src/app/core/validators/ipv4.validator';

@Component({
    selector: 'app-gateway-form',
    templateUrl: './gateway-form.component.html',
})
export class GatewayFormComponent implements OnInit {
    /**
     * Optional gateway to edit. This property defines
     * whether this form is to create a new gateway
     * (no gateway is passed) or to edit an existing gateway
     * (if a gateway is passed).
     */
    @Input() gateway?: Gateway;

    /** Form with the fields to create or edit a gateway. */
    form!: FormGroup;

    /** Controller to emit the loading state values. */
    private _loadingController: Subject<boolean>;

    /** Whether or not the component is performing an API call. */
    loading$: Observable<boolean>;

    constructor(
        private _drawerRef: NzDrawerRef<GatewayFormComponent, boolean>,
        private _fb: FormBuilder,
        private _gatewayApiService: GatewayApiService
    ) {
        // set up state management for this component
        this._loadingController = new Subject();
        this.loading$ = this._loadingController.asObservable();
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            name: [this.gateway?.name, [Validators.required]],
            ipv4: [this.gateway?.ipv4, [Validators.required, ipv4()]],
        });
    }

    /** Closes the drawer. */
    close(): void {
        this._drawerRef.close(false);
    }

    /** Called when the submit but is clicked. */
    onSubmit(): void {
        if (this.form.valid) {
            // submit data
            this._loadingController.next(true);

            // if there is no gateway then this form was open to create a new
            // gateway.
            if (!this.gateway) {
                const gatewayToCreate: GatewayToCreate = this.form.value;
                this._gatewayApiService
                    .post(gatewayToCreate)
                    .pipe(take(1))
                    .subscribe((_) => {
                        this._drawerRef.close(true);
                    });
                // else then this form was open to edit a gateway.
            } else {
                const gatewayToUpdate: GatewayToUpdate = this.form.value;
                this._gatewayApiService
                    .put(this.gateway!.uid, gatewayToUpdate)
                    .pipe(take(1))
                    .subscribe(() => {
                        this._drawerRef.close(true);
                    });
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
