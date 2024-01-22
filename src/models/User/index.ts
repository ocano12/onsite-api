import { Address } from '../Address';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: 'Client' | 'Employee';
    email: string;
    address: Address;
}
