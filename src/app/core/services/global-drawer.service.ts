import { Injectable } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { DeviceFormComponent } from 'src/app/shared/custom-components/device-form/device-form.component';
import { GatewayFormComponent } from 'src/app/shared/custom-components/gateway-form/gateway-form.component';
import { Device, Gateway } from '../models/models';

const DRAWER_WITH = 520;

@Injectable()
export class GlobalDrawerService {
    constructor(private _drawerService: NzDrawerService) {}

    /**
     * Opens a drawer with a form to create a gateway using
     * the NzDrawerService.
     */
    openCreateGatewayForm(): NzDrawerRef<GatewayFormComponent, boolean> {
        return this._drawerService.create({
            nzContent: GatewayFormComponent,
            nzTitle: 'Create gateway',
            nzMaskClosable: false,
            nzWidth: DRAWER_WITH,
        });
    }

    /**
     * Opens a drawer with a form to edit a gateway using
     * the NzDrawerService.
     */
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
            nzWidth: DRAWER_WITH,
        });
    }

    /**
     * Opens a drawer with a form to create a device
     * for the given gateway using the NzDrawerService.
     */
    openCreateDeviceForm(
        gateway: Gateway
    ): NzDrawerRef<DeviceFormComponent, boolean> {
        return this._drawerService.create<
            DeviceFormComponent,
            { gatewayUid: string },
            boolean
        >({
            nzContent: DeviceFormComponent,
            nzContentParams: { gatewayUid: gateway.uid },
            nzTitle: 'Create device',
            nzMaskClosable: false,
            nzWidth: DRAWER_WITH,
        });
    }

    /**
     *
     * @param param0
     * @param device
     * @returns
     */
    openEditDeviceForm(
        gateway: Gateway,
        device: Device
    ): NzDrawerRef<DeviceFormComponent, boolean> {
        return this._drawerService.create<
            DeviceFormComponent,
            { device: Device; gatewayUid: string },
            boolean
        >({
            nzContent: DeviceFormComponent,
            nzContentParams: { device, gatewayUid: gateway.uid },
            nzTitle: 'Edit device',
            nzMaskClosable: false,
            nzWidth: DRAWER_WITH,
        });
    }
}
