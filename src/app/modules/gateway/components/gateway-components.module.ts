import { NgModule } from '@angular/core';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SharedModule } from 'src/app/shared/shared.module';
import { DevicesStatusCellComponent } from './devices-status-cell/devices-status-cell.component';
import { DeviceTableComponent } from './device-table/device-table.component';

@NgModule({
    declarations: [
        GatewayTableComponent,
        DevicesStatusCellComponent,
        DeviceTableComponent,
    ],
    imports: [
        SharedModule,

        // NG-ZORRO imports
        NzTableModule,
        NzBadgeModule,
    ],
    exports: [GatewayTableComponent],
})
export class GatewayComponentsModule {}
