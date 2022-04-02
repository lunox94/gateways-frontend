import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableSortFn } from 'ng-zorro-antd/table';
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

    /** Whether the table is loading its content. */
    @Input() loading = false;

    /** Emit a device that has been selected for edition. */
    @Output() editRequested = new EventEmitter<Device>();

    /** Emit a device that has been selected for deletion. */
    @Output() deleteRequested = new EventEmitter<Device>();

    /** Possible device statuses. */
    readonly _statusEnum = DeviceStatus;

    /** Function to sort by vendor in NzTable */
    readonly vendorSortFn: NzTableSortFn<Device> = (
        a: Device,
        b: Device
    ): number => a.vendor.localeCompare(b.vendor);

    /** Function to sort by status in NzTable */
    readonly statusSortFn: NzTableSortFn<Device> = (
        a: Device,
        b: Device
    ): number => a.status - b.status;

    /** Function to sort by createdAt in NzTable */
    readonly createdAtSortFn: NzTableSortFn<Device> = (
        a: Device,
        b: Device
    ): number => (a.createdAt < b.createdAt ? -1 : 1);

    constructor() {}

    ngOnInit(): void {}
}
