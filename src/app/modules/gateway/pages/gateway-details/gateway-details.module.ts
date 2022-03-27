import { NgModule } from '@angular/core';
import { GatewayDetailsComponent } from './gateway-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { GatewayComponentsModule } from '../../components/gateway-components.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

const gatewayDetailsRoutes: Route[] = [
    {
        path: '',
        component: GatewayDetailsComponent,
    },
];

@NgModule({
    declarations: [GatewayDetailsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(gatewayDetailsRoutes),
        GatewayComponentsModule,

        // NG-ZORRO imports
        NzDescriptionsModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
    ],
})
export class GatewayDetailsModule {}
