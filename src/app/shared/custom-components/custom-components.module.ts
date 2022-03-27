import { NgModule } from '@angular/core';
import { DrawerComponent } from './drawer/drawer.component';
import { SharedModule } from '../shared.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
    declarations: [DrawerComponent, GatewayFormComponent],
    imports: [
        SharedModule,

        // NG-ZORRO imports
        NzDrawerModule,
        NzButtonModule,
        NzDividerModule,
        NzInputModule,
        NzFormModule,
    ],
    exports: [DrawerComponent],
})
export class CustomComponentsModule {}
