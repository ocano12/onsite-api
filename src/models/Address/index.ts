export interface Address {
    id: number;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
    modifiedBy: number;
}
