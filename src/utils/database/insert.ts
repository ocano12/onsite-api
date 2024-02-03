import { pool } from '@database';

export interface DBProps<T> {
    tableName: string;
    columns: string[];
    values: T[];
}

//TODO: what should return here to better error handle.
export const dbInsert = async <T>({ tableName, columns, values }: DBProps<T>) => {
    try {
        const columnString: string = columns.join(', ');

        const valueString: string = columns.map((_, index) => `$${index + 1}`).join(', ');

        const query = `INSERT INTO ${tableName} (${columnString}) VALUES (${valueString}) RETURNING *`;
        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (e) {
        throw new Error(`Could not insert into ${tableName}, reason = ${e}`);
    }
};
