type Status = 'Open' | 'Closed' | 'In Progress' | 'Cancelled';

type Incident = 'Interior' | 'Exterior' | 'Hvac' | 'Landscape' | 'Other';

export interface Ticket {
    id: number;
    title: string;
    description?: string;
    status: Status;
    urgent: boolean;
    location?: string;
    incidentType?: Incident;
    assigned?: number;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
}
