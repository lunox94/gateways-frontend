import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
