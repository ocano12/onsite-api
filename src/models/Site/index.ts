import { Address } from '../Address';

export interface Site {
    id: number;
    name: string;
    addressID: number;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
    modifiedBy: number;
}
