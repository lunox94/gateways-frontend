import { Component, Input, OnInit } from '@angular/core';
import { Gateway } from 'src/app/core/models/models';

@Component({
    selector: 'app-gateway-table',
    templateUrl: './gateway-table.component.html',
})
export class GatewayTableComponent implements OnInit {
    //** List of gateways to display in a table. */
    @Input() gatewayList: Gateway[] = [];

    constructor() {}

    ngOnInit(): void {}
}
