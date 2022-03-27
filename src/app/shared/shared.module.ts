import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { GlobalDrawerModule } from '../core/services/global-drawer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GlobalDrawerModule,

        // NG-ZORRO imports
        NzTypographyModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTypographyModule,
        GlobalDrawerModule,
    ],
})
export class SharedModule {}
