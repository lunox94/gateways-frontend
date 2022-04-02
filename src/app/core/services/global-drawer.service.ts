import { Injectable } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { DeviceFormComponent } from 'src/app/shared/custom-components/device-form/device-form.component';
import { GatewayFormComponent } from 'src/app/shared/custom-components/gateway-form/gateway-form.component';
import { Device, Gateway } from '../models/models';

const NZ_WRAP_CLASS_NAME = 'global-drawer';

@Injectable()
export class GlobalDrawerService {
    drawerRef?: NzDrawerRef<any, any>;

    constructor(private _drawerService: NzDrawerService) {}

    /**
     * Opens a drawer with a form to create a gateway using
     * the NzDrawerService.
     * @returns A reference to the drawer.
     */
    openCreateGatewayForm(): NzDrawerRef<GatewayFormComponent, boolean> {
        return (this.drawerRef = this._drawerService.create({
            nzContent: GatewayFormComponent,
            nzTitle: 'Create gateway',
            nzMaskClosable: false,
            nzWrapClassName: NZ_WRAP_CLASS_NAME,
        }));
    }

    /**
     * Opens a drawer with a form to edit a gateway using
     * the NzDrawerService.
     * @param gateway The gateway to edit.
     * @returns A reference to the drawer.
     */
    openEditGatewayForm(
        gateway: Gateway
    ): NzDrawerRef<GatewayFormComponent, any> {
        return (this.drawerRef = this._drawerService.create<
            GatewayFormComponent,
            { gateway: Gateway },
            any
        >({
            nzContent: GatewayFormComponent,
            nzContentParams: { gateway },
            nzTitle: 'Edit gateway',
            nzMaskClosable: false,
            nzWrapClassName: NZ_WRAP_CLASS_NAME,
        }));
    }

    /**
     * Opens a drawer with a form to create a device
     * for the given gateway using the NzDrawerService.
     * @param gateway The gateway that will own the device.
     * @returns A reference to the drawer.
     */
    openCreateDeviceForm(
        gateway: Gateway
    ): NzDrawerRef<DeviceFormComponent, boolean> {
        return (this.drawerRef = this._drawerService.create<
            DeviceFormComponent,
            { gatewayUid: string },
            boolean
        >({
            nzContent: DeviceFormComponent,
            nzContentParams: { gatewayUid: gateway.uid },
            nzTitle: 'Create device',
            nzMaskClosable: false,
            nzWrapClassName: NZ_WRAP_CLASS_NAME,
        }));
    }

    /**
     * Opens a drawer with a form to edit an existing device
     * using the NzDrawerService.
     * @param gateway The gateway that owns the device.
     * @param device The device to edit.
     * @returns A reference to the drawer.
     */
    openEditDeviceForm(
        gateway: Gateway,
        device: Device
    ): NzDrawerRef<DeviceFormComponent, boolean> {
        return (this.drawerRef = this._drawerService.create<
            DeviceFormComponent,
            { device: Device; gatewayUid: string },
            boolean
        >({
            nzContent: DeviceFormComponent,
            nzContentParams: { device, gatewayUid: gateway.uid },
            nzTitle: 'Edit device',
            nzMaskClosable: false,
            nzWrapClassName: NZ_WRAP_CLASS_NAME,
        }));
    }
}
