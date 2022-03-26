import { Component, Input, OnInit } from '@angular/core';
import { Device, DeviceStatus } from 'src/app/core/models/models';

@Component({
    selector: 'app-devices-status-cell',
    templateUrl: './devices-status-cell.component.html',
})
export class DevicesStatusCellComponent implements OnInit {
    //** List of devices */
    @Input() devices: Device[] = [];

    private _online: number = 0;

    //** Amount of devices in online state */
    public get online(): number {
        return this._online;
    }

    private _offline: number = 0;

    //** Amount of devices in offline state */
    public get offline(): number {
        return this._offline;
    }

    constructor() {}

    ngOnInit(): void {
        this._online = this.devices.filter(
            (d) => d.status === DeviceStatus.Online
        ).length;
        this._offline = this.devices.filter(
            (d) => d.status === DeviceStatus.Offline
        ).length;
    }
}
