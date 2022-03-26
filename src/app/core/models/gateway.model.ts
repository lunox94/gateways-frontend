import { Device } from './models';

export interface Gateway {
    uid: string;
    name: string;
    ipv4: string;
    devices: Device[];
}
