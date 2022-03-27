import { Injectable } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { GatewayFormComponent } from 'src/app/shared/custom-components/gateway-form/gateway-form.component';
import { Gateway } from '../models/models';

@Injectable()
export class GlobalDrawerService {
    constructor(private _drawerService: NzDrawerService) {}

    openCreateGatewayForm(): NzDrawerRef<GatewayFormComponent, any> {
        return this._drawerService.create({
            nzContent: GatewayFormComponent,
            nzTitle: 'Create gateway',
            nzMaskClosable: false,
            nzWidth: 520,
        });
    }

    openEditGatewayForm(
        gateway: Gateway
    ): NzDrawerRef<GatewayFormComponent, any> {
        return this._drawerService.create<
            GatewayFormComponent,
            { gateway: Gateway },
            any
        >({
            nzContent: GatewayFormComponent,
            nzContentParams: { gateway },
            nzTitle: 'Edit gateway',
            nzMaskClosable: false,
            nzWidth: 520,
        });
    }
}
