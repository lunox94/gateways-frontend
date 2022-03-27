import { Component, OnInit } from '@angular/core';
import { DeviceStatus, Gateway } from 'src/app/core/models/models';

@Component({
    templateUrl: './gateway-details.component.html',
})
export class GatewayDetailsComponent implements OnInit {
    gateway?: Gateway;

    constructor() {}

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
}
