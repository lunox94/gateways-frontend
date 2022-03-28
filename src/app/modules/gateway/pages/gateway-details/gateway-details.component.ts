import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device, DeviceStatus, Gateway } from 'src/app/core/models/models';
import { GlobalDrawerService } from 'src/app/core/services/global-drawer.service';

@Component({
    templateUrl: './gateway-details.component.html',
})
export class GatewayDetailsComponent implements OnInit {
    gateway?: Gateway;

    constructor(
        private _globalDrawerService: GlobalDrawerService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.gateway = {
            uid: 'asxy00-45fghh-43566h-dggxx2',
            ipv4: '255.0.0.0',
            name: 'PSI-2004',
            devices: [
                {
                    uid: 1,
                    createdAt: new Date(Date.now()),
                    status: DeviceStatus.Online,
                    vendor: 'CISCO',
                },
                {
                    uid: 2,
                    createdAt: new Date(Date.now()),
                    status: DeviceStatus.Offline,
                    vendor: 'Logitech',
                },
            ],
        };
    }

    /** Opens a drawer with the form to edit the current gateway. */
    openEditGatewayForm(): void {
        const ref = this._globalDrawerService.openEditGatewayForm(
            this.gateway!
        );
    }

    /**
     * Opens a drawer with the form to create a device for the current
     * gateway. */
    openCreateDeviceForm(): void {
        const ref = this._globalDrawerService.openCreateDeviceForm(
            this.gateway!
        );
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
