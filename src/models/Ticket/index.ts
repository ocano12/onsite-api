import { Site, Comment } from '@models';
type Status = 'Open' | 'Closed' | 'In Progress' | 'Cancelled';

type Incident = 'Interior' | 'Exterior' | 'Hvac' | 'Landscape' | 'Other';

export interface Ticket {
    id: number;
    title: string;
    status: Status;
    emergancy: boolean;
    site?: Site;
    incidentType?: Incident;
    comment?: Comment;
    assigned?: number;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
    modifiedBy: number;
}

export interface TicketPayload {
    title: string;
    status: Status;
    emergancy: boolean;
    siteID: number;
    incidentType: Incident;
    comment?: string;
    userID: number;
}
