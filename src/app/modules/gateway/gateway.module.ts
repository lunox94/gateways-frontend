import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

export const GATEWAY_PARAM_UID = 'uid';

const gatewayRoutes: Route[] = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/gateway-list/gateway-list.module').then(
                (m) => m.GatewayListModule
            ),
    },
    {
        path: `:${GATEWAY_PARAM_UID}`,
        loadChildren: () =>
            import('./pages/gateway-details/gateway-details.module').then(
                (m) => m.GatewayDetailsModule
            ),
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(gatewayRoutes)],
})
export class GatewayModule {}
