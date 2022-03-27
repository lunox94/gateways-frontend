import { NgModule } from '@angular/core';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SharedModule } from 'src/app/shared/shared.module';
import { DevicesStatusCellComponent } from './devices-status-cell/devices-status-cell.component';
import { DeviceTableComponent } from './device-table/device-table.component';
import { RouterModule } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
    declarations: [
        GatewayTableComponent,
        DevicesStatusCellComponent,
        DeviceTableComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,

        // NG-ZORRO imports
        NzTableModule,
        NzBadgeModule,
        NzDividerModule,
        NzPopconfirmModule,
    ],
    exports: [GatewayTableComponent, DeviceTableComponent],
})
export class GatewayComponentsModule {}
