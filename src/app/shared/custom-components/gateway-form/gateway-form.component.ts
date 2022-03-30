import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { from, Observable, Subject } from 'rxjs';
import { mapTo, mergeAll, shareReplay, switchMap, tap } from 'rxjs/operators';
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

    /** Whether or not the component is performing an API call. */
    loading$!: Observable<boolean>;

    private readonly _createGatewayRequest = new Subject<GatewayToCreate>();
    private readonly _updateGatewayRequest = new Subject<{
        uid: string;
        gatewayToUpdate: GatewayToUpdate;
    }>();

    constructor(
        private _drawerRef: NzDrawerRef<GatewayFormComponent, boolean>,
        private _fb: FormBuilder,
        private _gatewayApiService: GatewayApiService
    ) {}

    ngOnInit(): void {
        // create the form
        this.form = this._fb.group({
            name: [this.gateway?.name, [Validators.required]],
            ipv4: [this.gateway?.ipv4, [Validators.required, ipv4()]],
        });

        // emits when a request to create a gateway is triggered
        const afterGatewayCreate$ = this._createGatewayRequest.pipe(
            switchMap(this._createGateway),
            tap((_) => this._drawerRef.close(true))
        );

        // emits when a request to update a gateway is triggered
        const afterGatewayUpdate$ = this._updateGatewayRequest.pipe(
            switchMap(this._updateGateway),
            tap((_) => this._drawerRef.close(true))
        );

        // indicates that a request to create or update a gateway has started
        const loadStart$ = from([
            this._createGatewayRequest,
            this._updateGatewayRequest,
        ]).pipe(mergeAll(), mapTo(true));

        // indicates that a request to create or update a gateway has ended
        const loadEnd$ = from([afterGatewayCreate$, afterGatewayUpdate$]).pipe(
            mergeAll(),
            mapTo(false)
        );

        // indicates whether a gateway is being created / updated
        this.loading$ = from([loadStart$, loadEnd$]).pipe(
            mergeAll(),
            shareReplay(1)
        );
    }

    /** Closes the drawer. */
    close(): void {
        this._drawerRef.close(false);
    }

    /** Called when the submit button is clicked. */
    onSubmit(): void {
        if (this.form.valid) {
            // if there is no gateway then this form was open to create a new
            // gateway
            if (!this.gateway) {
                const gatewayToCreate: GatewayToCreate = this.form.value;
                // request to create a gateway
                this._createGatewayRequest.next(gatewayToCreate);
            } else {
                // else then this form was open to edit a gateway
                const gatewayToUpdate: GatewayToUpdate = this.form.value;
                this._updateGatewayRequest.next({
                    uid: this.gateway!.uid,
                    gatewayToUpdate,
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

    private readonly _createGateway = (gatewayToCreate: GatewayToCreate) =>
        this._gatewayApiService.post(gatewayToCreate);

    private readonly _updateGateway = ({
        uid,
        gatewayToUpdate,
    }: {
        uid: string;
        gatewayToUpdate: GatewayToUpdate;
    }) => this._gatewayApiService.put(uid, gatewayToUpdate);
}
