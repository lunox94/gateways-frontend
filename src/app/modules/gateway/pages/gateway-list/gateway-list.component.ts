import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Device, DeviceStatus, Gateway } from 'src/app/core/models/models';
import { GatewayFormComponent } from 'src/app/shared/custom-components/gateway-form/gateway-form.component';

@Component({
    templateUrl: './gateway-list.component.html',
})
export class GatewayListComponent implements OnInit {
    sampleData: Gateway[] = [];

    constructor(private _drawerService: NzDrawerService) {}

    ngOnInit(): void {
        this.sampleData = this._getSampleData();
    }

    /** Opens the drawer with the create gateway form. */
    openCreateDrawer(): void {
        const ref = this._drawerService.create({
            nzContent: GatewayFormComponent,
            nzTitle: 'Create',
            nzMaskClosable: false,
            nzWidth: 520,
        });
    }

    private _getSampleData() {
        return [
            {
                uid: 'asxy00-45fghh-43566h-dggxx2',
                ipv4: '255.0.0.0',
                name: 'PSI-2004',
                devices: this._getSampleDevices(),
            },
            {
                uid: 'qmo491-ayy4ys-2hgkk3-1ee3d3',
                ipv4: '255.255.0.0',
                name: 'PSI-X200',
                devices: [],
            },
            {
                uid: 'hjk89t-fg34jx-pq40cj-128ut6',
                ipv4: '198.201.4.42',
                name: 'XEROX-CTER04',
                devices: this._getSampleDevices(),
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
