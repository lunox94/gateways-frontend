import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,

        // NG-ZORRO imports
        NzTypographyModule,
        NzMessageServiceModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        NzTypographyModule,
        NzMessageServiceModule,
    ],
})
export class SharedModule {}
