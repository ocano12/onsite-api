import { Address } from '../Address';

export interface Site {
    id: number;
    name: string;
    address: Address;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
}
