import { NgModule } from '@angular/core';
import { DrawerComponent } from './drawer/drawer.component';
import { SharedModule } from '../shared.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
    declarations: [DrawerComponent],
    imports: [
        SharedModule,

        // NG-ZORRO imports
        NzDrawerModule,
    ],
})
export class CustomComponentsModule {}
