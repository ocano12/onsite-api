import { pool } from '../models/database';
import { Ticket } from '@models';
import { Request, ResponseToolkit } from '@hapi/hapi';

//TODO: add pool release in the finally block of a try catch for all requests

export const createTicket = async (req: Request, h: ResponseToolkit) => {
    try {
        const { title, description, status, urgent, location, incidentType, assigned, createdBy } =
            req.payload as Ticket;

        //TODO: add validation here
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

export const getTickets = async (
    req: Request,
    h: ResponseToolkit
): Promise<Ticket[] | ReturnType<ResponseToolkit['response']>> => {
    //TODO: add validation here

    const ticket = await pool.query('SELECT * FROM TICKETS ');

    if (ticket.rows.length === 0) {
        return h.response('Ticket not found').code(404);
    }

    return ticket.rows;
};

export const getTicketByID = async (req: Request, h: ResponseToolkit) => {
    const { ticketID } = req.params as { ticketID: number };
    //TODO: add validation here

    const ticket = await pool.query('SELECT * FROM TICKETS WHERE id =$1', [ticketID]);

    if (ticket.rows.length === 0) {
        return h.response('Ticket not found').code(404);
    }

    return ticket.rows[0];
};

//update a ticket
export const updateTicketByID = async (req: Request, h: ResponseToolkit) => {
    const ticketID = req.params.ticketID;
    const updatedFields = req.payload as Partial<Ticket>;

    if (Object.keys(updatedFields).length === 0) {
        return h.response('Nothing to update').code(400);
    }

    const setClause = Object.keys(updatedFields)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(', ');

    const setValues = Object.values(updatedFields);
    setValues.push(ticketID);

    //TODO add validations
    const updateTicket = await pool.query(`UPDATE TICKETS SET ${setClause} WHERE id=$${setValues.length}`, setValues);

    if (updateTicket.rowCount === 0) {
        return h.response('Ticket not found').code(404);
    }

    return h.response({ success: true }).code(200);
};

export const deleteTicketByID = async (req: Request, h: ResponseToolkit) => {
    const { ticketID } = req.params as { ticketID: number };
    //TODO: add validation here

    const ticket = await pool.query('DELETE FROM TICKETS WHERE id =$1', [ticketID]);

    if (ticket.rows.length === 0) {
        return h.response('Ticket not found').code(404);
    }

    return h.response({ success: true }).code(200);
};
