import * as TicketController from '../controllers/ticket';
import { ServerRoute } from '@hapi/hapi';

export const routes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/create-ticket',
        handler: TicketController.createTicket,
    },
    {
        method: 'GET',
        path: '/ticket',
        handler: TicketController.getTickets,
    },
    {
        method: 'GET',
        path: '/ticket/{ticketID}',
        handler: TicketController.getTicketByID,
    },
    {
        method: 'PUT',
        path: '/ticket/{ticketID}',
        handler: TicketController.updateTicketByID,
    },
    {
        method: 'DELETE',
        path: '/ticket/{ticketID}',
        handler: TicketController.deleteTicketByID,
    },
];
