import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: 'postgres://postgres:Lokithegod1!@localhost:5432/onsite',
});
