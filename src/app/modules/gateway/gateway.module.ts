import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const gatewayRoutes: Route[] = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/gateway-list/gateway-list.module').then(
                (m) => m.GatewayListModule
            ),
    },
    {
        path: ':id',
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
