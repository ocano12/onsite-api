import { Address } from '../Address';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    isClient: boolean;
    email: string;
    addressID: number;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
    modifiedBy: number;
}

//TODO what happens if a user wants to be deleted. I think I need a status field
