import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './server-error.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

const serverErrorRoutes: Route[] = [
    {
        path: '',
        component: ServerErrorComponent,
    },
];

@NgModule({
    declarations: [ServerErrorComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(serverErrorRoutes),

        //NG-ZORRO imports
        NzResultModule,
        NzButtonModule,
    ],
})
export class ServerErrorModule {}
