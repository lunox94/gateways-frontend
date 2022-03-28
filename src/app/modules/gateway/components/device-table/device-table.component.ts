import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    /** Whether or not the table should show the actions column. */
    @Input() showActions = false;

    /** Emit a device that has been selected for edition. */
    @Output() editRequested = new EventEmitter<Device>();

    /** Emit a device that has been selected for deletion. */
    @Output() deleteRequested = new EventEmitter<Device>();

    /** Possible device statuses. */
    readonly _statusEnum = DeviceStatus;

    constructor() {}

    ngOnInit(): void {}
}
