import { Component, OnInit } from '@angular/core';
import { Device, DeviceStatus, Gateway } from 'src/app/core/models/models';

@Component({
    templateUrl: './gateway-list.component.html',
})
export class GatewayListComponent implements OnInit {
    sampleData: Gateway[] = [];

    constructor() {}

    ngOnInit(): void {
        this.sampleData = this._getSampleData();
    }

    private _getSampleData() {
        return [
            {
                uid: 'ghdkj32-45fghh-43566h-dggxx2',
                ipv4: '255.0.0.0',
                name: 'PSI-2004',
                devices: [],
            },
            {
                uid: 'ghdkj32-45fghh-43566h-dggxx2',
                ipv4: '255.0.0.0',
                name: 'PSI-2004',
                devices: [],
            },
            {
                uid: 'ghdkj32-45fghh-43566h-dggxx2',
                ipv4: '255.0.0.0',
                name: 'PSI-2004',
                devices: [],
            },
        ];
    }

    private _getSampleDevices(): Device[] {
        return [
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
        ];
    }
}
