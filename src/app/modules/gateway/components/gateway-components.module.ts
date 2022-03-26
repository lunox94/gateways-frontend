import { NgModule } from '@angular/core';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DevicesStatusCellComponent } from './devices-status-cell/devices-status-cell.component';

@NgModule({
    declarations: [GatewayTableComponent, DevicesStatusCellComponent],
    imports: [SharedModule, NzTableModule],
    exports: [GatewayTableComponent],
})
export class GatewayComponentsModule {}
