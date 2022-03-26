import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayListComponent } from './gateway-list.component';
import { Route, RouterModule } from '@angular/router';

const gatewayListRoutes: Route[] = [
    {
        path: '',
        component: GatewayListComponent,
    },
];

@NgModule({
    declarations: [GatewayListComponent],
    imports: [CommonModule, RouterModule.forChild(gatewayListRoutes)],
})
export class GatewayListModule {}
