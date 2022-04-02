import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableSortFn } from 'ng-zorro-antd/table';
import { Gateway } from 'src/app/core/models/models';

@Component({
    selector: 'app-gateway-table',
    templateUrl: './gateway-table.component.html',
})
export class GatewayTableComponent implements OnInit {
    /** List of gateways to display in a table. */
    @Input() gatewayList: Gateway[] = [];

    /** Whether or not the table is loading its content. */
    @Input() loading: boolean = true;

    /** Emits a gateway that has been selected for deletion. */
    @Output() deleteRequested = new EventEmitter<Gateway>();

    /** Set of gateway ids to represent which row in the table is expanded */
    expandSet: Set<string>;

    /**
     * An artifact to generate a sort function given the field you want to sort.
     * @param field The field for which to generate the sort function.
     * @returns A sort function to use in the NzTable.
     */
    readonly defaultSortFactory =
        (field: 'name' | 'ipv4'): NzTableSortFn<Gateway> =>
        (a: Gateway, b: Gateway): number =>
            a[field].localeCompare(b[field]);

    readonly deviceSortFn: NzTableSortFn<Gateway> = (
        a: Gateway,
        b: Gateway
    ): number => a.devices.length - b.devices.length;

    /** List of filters for the devices column. */
    readonly listOfDeviceFilters = [
        { text: 'No devices', value: true },
        { text: 'With devices', value: false },
    ];

    /** Function to filter the devices column. */
    readonly deviceFilterFn = (list: [], item: Gateway) =>
        list.some((value) =>
            value ? item.devices.length == 0 : item.devices.length != 0
        );

    constructor() {
        this.expandSet = new Set<string>();
    }

    ngOnInit(): void {}

    onExpandChange(uid: string, checked: boolean): void {
        if (checked) {
            this.expandSet.add(uid);
        } else {
            this.expandSet.delete(uid);
        }
    }
}
