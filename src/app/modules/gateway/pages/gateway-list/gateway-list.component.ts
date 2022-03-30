import { Component, OnInit } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { filter, mapTo, shareReplay, startWith, switchMap } from 'rxjs/operators';
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

    private readonly _createGatewayRequest = new Subject();

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _gatewayApiService: GatewayApiService
    ) {}

    ngOnInit(): void {
        // Open a drawer with the create gateway form every time it is requested.
        // When the form is closed it will return a boolean that indicates whether
        // or not a gateway was created. From this an observable will be created
        // that emits whenever is needed to update the list of gateways.
        const reloadGateways$ = this._createGatewayRequest.pipe(
            switchMap(this._openDrawer),
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
        const loadStarts$ = reloadGateways$.pipe(mapTo(true));

        // Indicates that a request to load gateways has finished.
        const loadEnds$ = this.gateways$.pipe(mapTo(false));

        // Build the loading state.
        this.loading$ = merge(loadStarts$, loadEnds$).pipe(shareReplay(1));
    }

    /** Requests to open a drawer with the create gateway form. */
    requestToCreateNewGateway(): void {
        this._createGatewayRequest.next();
    }

    private readonly _openDrawer = () =>
        this._globalDrawerService.openCreateGatewayForm().afterClose;

    private readonly _getAllGateways = () => this._gatewayApiService.getAll();
}
