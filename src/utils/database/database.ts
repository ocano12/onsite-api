import { Pool } from 'pg';
import { dbInsert } from './insert';

//TODO: make these into env varibles.
const pool = new Pool({
    connectionString: 'postgres://postgres:Lokithegod1!@localhost:5432/onsite',
});

export { dbInsert, pool };
