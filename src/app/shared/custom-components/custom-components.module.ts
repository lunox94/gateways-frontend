import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [GatewayFormComponent],
    imports: [
        SharedModule,

        // NG-ZORRO imports
        NzButtonModule,
        NzDividerModule,
        NzInputModule,
        NzFormModule,

        // 3rd party modules
        NgxMaskModule.forChild(),
    ],
})
export class CustomComponentsModule {}
