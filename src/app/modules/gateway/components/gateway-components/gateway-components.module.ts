import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';

@NgModule({
    declarations: [GatewayTableComponent],
    imports: [CommonModule],
    exports: [GatewayTableComponent],
})
export class GatewayComponentsModule {}
