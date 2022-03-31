import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Route, RouterModule } from '@angular/router';

const notFoundRoutes: Route[] = [
    {
        path: '',
        component: NotFoundComponent,
    },
];

@NgModule({
    declarations: [NotFoundComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(notFoundRoutes),

        //NG-ZORRO imports
        NzResultModule,
        NzButtonModule,
    ],
})
export class NotFoundModule {}
