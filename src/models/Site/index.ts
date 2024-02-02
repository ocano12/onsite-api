import { Address } from '../Address';

export interface Site {
    id: number;
    address: Address;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
}
