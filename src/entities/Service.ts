import {IComment} from "./Comment";
import {IContact} from "./Contact";

export interface Service {
    id: number;
    title: string;
    category: string;
    description: string;
    type: string; // Puede ser 'Individual' o 'Grupal'
    frequency: string; // Puede ser 'única', 'semanal', o 'mensual'
    rating: number;
    responsibleId: string,
    responsible: string;
    responsibleExperience: string,
    responsiblePhotoUrl: string,
    duration: string;
    days: string[],
    cost: number;
    comments: IComment[];
    contact: IContact[];
    isPublished: boolean;
}

