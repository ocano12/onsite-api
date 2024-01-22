import { pool } from '../models/database';
import { Ticket } from '@models';
import { Request, ResponseToolkit } from '@hapi/hapi';

export const createTicket = async (req: Request, h: ResponseToolkit) => {
    try {
        const { title, description, status, urgent, location, incidentType, assigned, createdBy } =
            req.payload as Ticket;

        console.log(req.payload);

        const result = await pool.query(
            'INSERT INTO tickets (title, description, status, urgent, incident_type, location, assigned, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [title, description, status, urgent, incidentType, location, assigned, createdBy]
        );

        return result.rows[0];
    } catch (error) {
        console.error(error);
        return h.response('Error creating ticket').code(500);
    }
};
