import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const statusPagesRoutes: Route[] = [
    {
        path: 'server-error',
        loadChildren: () =>
            import('./pages/server-error/server-error.module').then(
                (m) => m.ServerErrorModule
            ),
    },
    {
        path: 'not-found',
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then(
                (m) => m.NotFoundModule
            ),
    },
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(statusPagesRoutes)],
})
export class StatusPagesModule {}
