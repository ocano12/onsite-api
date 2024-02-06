import { Address } from '@models';
import { dbInsert } from '@database';

//TODO: should i just return the ID? I think so
export const insertAddress = async (address1: string, city: string, state: string, zipCode: string, address2?: string): Promise<Address['id']> => {
    try {
        const result: Address = await dbInsert({ tableName: 'addresses', columns: ['comment, created_by'], values: [address1, address2, city, state, zipCode] });

        return result.id;
    } catch (e) {
        console.log(e);
        throw new Error(`${e}`);
    }
};
