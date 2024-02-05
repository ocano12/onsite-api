import { Site } from '@models';
import { dbInsert } from '@database';

//TODO: should i just return the ID? I think so
export const insertSite = async ({ name, createdBy }: Site) => {
    try {
        const result: Site = await dbInsert({ tableName: 'sites', columns: ['name, address_id, created_by'], values: [name, createdBy] });

        return result.id;
    } catch (e) {
        console.log(e);
        return {};
    }
};
