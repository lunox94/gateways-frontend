import { Component, OnInit } from '@angular/core';
import { DeviceStatus, Gateway } from 'src/app/core/models/models';
import { GlobalDrawerService } from 'src/app/core/services/global-drawer.service';

@Component({
    templateUrl: './gateway-details.component.html',
})
export class GatewayDetailsComponent implements OnInit {
    gateway?: Gateway;

    constructor(private _globalDrawerService: GlobalDrawerService) {}

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

    openEditGatewayForm(): void {
        const ref = this._globalDrawerService.openEditGatewayForm(
            this.gateway!
        );
    }
}
