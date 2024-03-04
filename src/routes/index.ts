import * as TicketController from '../controllers/tickets';
import * as SiteController from '../controllers/sites';
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
        path: '/tickets',
        handler: TicketController.getTickets,
    },
    {
        method: 'GET',
        path: '/tickets/{ticketID}',
        handler: TicketController.getTicketByID,
    },
    {
        method: 'PUT',
        path: '/tickets/{ticketID}',
        handler: TicketController.updateTicketByID,
    },
    {
        method: 'DELETE',
        path: '/tickets/{ticketID}',
        handler: TicketController.deleteTicketByID,
    },
    {
        method: 'GET',
        path: '/sites',
        handler: SiteController.getAllSites,
    },
];
