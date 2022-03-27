import { Component, Input, OnInit } from '@angular/core';
import { Device, DeviceStatus } from 'src/app/core/models/models';

@Component({
    selector: 'app-device-table',
    templateUrl: './device-table.component.html',
})
export class DeviceTableComponent implements OnInit {
    /** List of devices to display in a table. */
    @Input() deviceList: Device[] = [];

    /** Whether or not the table should have borders. */
    @Input() bordered = true;

    /** Whether or not the table show its title. */
    @Input() hasTitle = true;

    /** Possible device statuses. */
    readonly _statusEnum = DeviceStatus;

    constructor() {}

    ngOnInit(): void {}
}
