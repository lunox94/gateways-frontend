import { DeviceStatus } from "./models";

export interface DeviceToUpdate {
    vendor: string;
    status: DeviceStatus;
}