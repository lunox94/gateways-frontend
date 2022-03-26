import { NgModule } from '@angular/core';
import { GatewayListComponent } from './gateway-list.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GatewayComponentsModule } from '../../components/gateway-components.module';

const gatewayListRoutes: Route[] = [
    {
        path: '',
        component: GatewayListComponent,
    },
];

@NgModule({
    declarations: [GatewayListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(gatewayListRoutes),
        GatewayComponentsModule,

        // NG-ZORRO imports
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
    ],
})
export class GatewayListModule {}
