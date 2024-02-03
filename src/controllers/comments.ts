import { Comment } from '@models';
import { pool } from '../utils/database/database';

export const insertComments = async ({ comment, createdBy }: Comment) => {
    try {
        const result = await pool.query('INSERT INTO tickets (comments, created_by) VALUES ($1, $2) RETURNING *', [comment, createdBy]);

        return result.rows[0];
    } catch (e) {
        console.log(e);
        return {};
    }
};
