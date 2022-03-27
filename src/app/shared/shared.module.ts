import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // NG-ZORRO imports
        NzTypographyModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTypographyModule,
    ],
})
export class SharedModule {}
