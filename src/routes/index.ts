import * as TicketController from '../controllers/ticket';
import * as SiteController from '../controllers/site';
import { ServerRoute } from '@hapi/hapi';

//TODO: separate these this file might get huge!
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
    {
        method: 'GET',
        path: '/sites',
        handler: SiteController.getAllSites,
    },
];
