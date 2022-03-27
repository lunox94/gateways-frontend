import { NgModule } from '@angular/core';
import { GlobalDrawerService } from './global-drawer.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
    imports: [NzDrawerModule],
    providers: [GlobalDrawerService],
})
export class GlobalDrawerModule {}
