import { DeviceStatus } from './models';

export interface DeviceToCreate {
    vendor: string;
    status: DeviceStatus;
}
