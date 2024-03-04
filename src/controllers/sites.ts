import { Site } from '@models';
import { dbInsert, pool } from '@database';
import { Request, ResponseToolkit } from '@hapi/hapi';

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

//TODO: create a common get all
export const getAllSites = async (req: Request, h: ResponseToolkit): Promise<Site[] | ReturnType<ResponseToolkit['response']>> => {
    //TODO: add validation here

    const site = await pool.query(
        'SELECT s.id, s.name, s.isresidential, a.address_1, a.address_2, a.city, a.state, a.zip_code FROM sites s, addresses a WHERE s.address_id = a.id'
    );

    if (site.rows.length === 0) {
        return h.response('Site not found').code(404);
    }

    return site.rows;
};
