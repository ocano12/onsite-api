import { Address } from '../Address';

export interface Site {
    id: number;
    name: string;
    addressID: number;
    isResidential: boolean;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
    modifiedBy: number;
}
