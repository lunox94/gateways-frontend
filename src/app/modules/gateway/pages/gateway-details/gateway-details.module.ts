import { NgModule } from '@angular/core';
import { GatewayDetailsComponent } from './gateway-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { GatewayComponentsModule } from '../../components/gateway-components.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

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
        NzCardModule,
        NzIconModule,
        NzBreadCrumbModule,
    ],
})
export class GatewayDetailsModule {}
