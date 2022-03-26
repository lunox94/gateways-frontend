import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'gateways',
        loadChildren: () =>
            import('./modules/gateway/gateway.module').then(
                (m) => m.GatewayModule
            ),
    },
    {
        path: '**',
        redirectTo: 'gateways',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
