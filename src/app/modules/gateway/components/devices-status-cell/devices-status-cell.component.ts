import { Component, Input, OnInit } from '@angular/core';
import { Device, DeviceStatus } from 'src/app/core/models/models';

@Component({
    selector: 'app-devices-status-cell',
    templateUrl: './devices-status-cell.component.html',
})
export class DevicesStatusCellComponent implements OnInit {
    @Input() devices: Device[] = [];

    online: Device[] = [];
    offline: Device[] = [];

    constructor() {}

    ngOnInit(): void {
        this.online = this.devices.filter(
            (d) => d.status === DeviceStatus.Online
        );
        this.offline = this.devices.filter(
            (d) => d.status === DeviceStatus.Offline
        );
    }
}
