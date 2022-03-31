import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { from, merge, Observable, Subject } from 'rxjs';
import {
    filter,
    mapTo,
    mergeAll,
    shareReplay,
    startWith,
    switchMap,
    tap,
} from 'rxjs/operators';
import { GatewayApiService } from 'src/app/core/api/gateway/gateway-api.service';
import { Gateway } from 'src/app/core/models/models';
import { GlobalDrawerService } from 'src/app/core/services/global-drawer.service';

@Component({
    templateUrl: './gateway-list.component.html',
})
export class GatewayListComponent implements OnInit {
    /**
     * Emits the list of gateways.
     */
    gateways$!: Observable<Gateway[]>;

    /**
     * Emits a boolean that indicates whether or not the
     * gateways are being loading.
     */
    loading$!: Observable<boolean>;

    /** Used to emit a request to open the form to create a gateway. */
    private readonly _createGatewayRequest = new Subject();
    /** Used to emit a request to delete a gateway. */
    private readonly _deleteGatewayRequest = new Subject<Gateway>();

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _gatewayApiService: GatewayApiService,
        private _messageService: NzMessageService
    ) {}

    ngOnInit(): void {
        // Open a drawer with the create gateway form every time it is requested.
        // When the form is closed it will return a boolean that indicates whether
        // or not a gateway was created.
        const afterClose$ = this._createGatewayRequest.pipe(
            switchMap(this._openDrawer)
        );

        // Emits when a gateway was deleted.
        const afterGatewayDelete$ = this._deleteGatewayRequest.pipe(
            switchMap(this._deleteGateway),
            tap(this._handleSuccessOnDelete),
            mapTo(true)
        );

        // From this an observable will be created that emits
        // whenever is needed to update the list of gateways.
        const reloadGateways$ = merge(afterClose$, afterGatewayDelete$).pipe(
            filter<boolean>(Boolean),
            shareReplay(1)
        );

        // Get the gateways every time is requested.
        this.gateways$ = reloadGateways$.pipe(
            startWith(true),
            switchMap(this._getAllGateways),
            shareReplay(1)
        );

        // Indicates that a request to load gateways has started.
        const loadStarts$ = reloadGateways$.pipe(startWith(true), mapTo(true));

        // Indicates that a request to load gateways has finished.
        const loadEnds$ = this.gateways$.pipe(mapTo(false));

        // Build the loading state.
        this.loading$ = from([loadStarts$, loadEnds$]).pipe(
            mergeAll(),
            shareReplay(1)
        );
    }

    /** Requests to open a drawer with the create gateway form. */
    requestToCreateNewGateway(): void {
        this._createGatewayRequest.next();
    }

    /**
     * Requests to delete a gateway.
     * @param gateway The gateway to delete.
     */
    requestToDeleteGateway(gateway: Gateway): void {
        this._deleteGatewayRequest.next(gateway);
    }

    private readonly _openDrawer = () =>
        this._globalDrawerService.openCreateGatewayForm().afterClose;

    private readonly _getAllGateways = () => this._gatewayApiService.getAll();

    private readonly _deleteGateway = ({ uid }: Gateway) =>
        this._gatewayApiService.delete(uid);

    private readonly _handleSuccessOnDelete = () => {
        this._messageService.success('Gateway deleted');
    };
}
