import { pool } from '../utils/database/database';
import { Ticket, TicketPayload } from '@models';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { dbInsert } from '@database';
import { insertSite } from './sites';
import { insertComments } from './comments';

//TODO: add pool release in the finally block of a try catch for all requests

export const createTicket = async (req: Request, h: ResponseToolkit) => {
    try {
        const { title, status, emergancy, siteID, incidentType, comment, userID } = req.payload as TicketPayload;
        let commentID;

        if (comment) {
            commentID = await insertComments(comment, userID);
        }

        const ticket: Ticket = await dbInsert({
            tableName: 'tickets',
            columns: ['title', 'status', 'site_id', 'emergancy', 'incident_type', 'comment_id', 'created_by', 'modified_by'],
            values: [title, status, siteID, emergancy, incidentType, commentID, userID, userID],
        });

        return ticket;
    } catch (error) {
        console.error(error);
        return h.response(`Error creating ticket: ${error}`).code(500);
    }
};

export const getTickets = async (req: Request, h: ResponseToolkit): Promise<Ticket[] | ReturnType<ResponseToolkit['response']>> => {
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
