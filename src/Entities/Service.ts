interface Service {
    id: number;
    title: string;
    description: string;
    category: string;
    type: string; // Puede ser 'Individual' o 'Grupal'
    frequency: string; // Puede ser 'única', 'semanal', o 'mensual'
    rating: number;
    responsible: string;
    duration: string;
    cost: number;
    comments: string[];
}

const ServicesList: Service[] = [
    {
        id: 1,
        title: "Yoga Grupal",
        description: "Clases de yoga para grupos pequeños",
        category: "Salud",
        type: "Grupal",
        frequency: "semanal",
        rating: 4.8,
        responsible: "Instructor de Yoga",
        duration: "60 minutos",
        cost: 5000,
        comments: [],
    },
    {
        id: 2,
        title: "Masaje Terapéutico",
        description: "Masajes relajantes y terapéuticos",
        category: "Bienestar",
        type: "Individual",
        frequency: "única",
        rating: 4.9,
        responsible: "Terapeuta de Masaje",
        duration: "90 minutos",
        cost: 7500,
        comments: [],
    },
    {
        id: 3,
        title: "Entrenamiento Personalizado",
        description: "Entrenamiento fitness individualizado",
        category: "Deporte",
        type: "Individual",
        frequency: "semanal",
        rating: 4.7,
        responsible: "Entrenador Personal",
        duration: "45 minutos",
        cost: 6000,
        comments: [],
    },
    {
        id: 4,
        title: "Taller de Cocina",
        description: "Aprende a cocinar platos deliciosos",
        category: "Cocina",
        type: "Grupal",
        frequency: "mensual",
        rating: 4.5,
        responsible: "Chef Instructor",
        duration: "120 minutos",
        cost: 4000,
        comments: [],
    },
    {
        id: 5,
        title: "Meditación Guiada",
        description: "Sesiones de meditación para la relajación",
        category: "Meditación",
        type: "Grupal",
        frequency: "semanal",
        rating: 4.6,
        responsible: "Instructor de Meditación",
        duration: "30 minutos",
        cost: 3500,
        comments: [],
    },
    {
        id: 6,
        title: "Consulta Nutricional",
        description: "Evaluación y consejos nutricionales",
        category: "Salud",
        type: "Individual",
        frequency: "única",
        rating: 4.9,
        responsible: "Nutricionista",
        duration: "60 minutos",
        cost: 5500,
        comments: [],
    },
    {
        id: 7,
        title: "Clases de Baile",
        description: "Aprende a bailar diferentes estilos",
        category: "Arte",
        type: "Grupal",
        frequency: "semanal",
        rating: 4.7,
        responsible: "Instructor de Baile",
        duration: "60 minutos",
        cost: 4500,
        comments: [],
    },
    {
        id: 8,
        title: "Terapia de Pareja",
        description: "Consejería y terapia de pareja",
        category: "Salud",
        type: "Individual",
        frequency: "semanal",
        rating: 4.8,
        responsible: "Terapeuta de Pareja",
        duration: "60 minutos",
        cost: 7000,
        comments: [],
    },
    {
        id: 9,
        title: "Curso de Fotografía",
        description: "Aprende técnicas de fotografía profesional",
        category: "Fotografía",
        type: "Grupal",
        frequency: "mensual",
        rating: 4.6,
        responsible: "Instructor de Fotografía",
        duration: "90 minutos",
        cost: 8000,
        comments: [],
    },
    {
        id: 10,
        title: "Sesión de Reiki",
        description: "Terapia de energía curativa",
        category: "Bienestar",
        type: "Individual",
        frequency: "única",
        rating: 4.9,
        responsible: "Terapeuta de Reiki",
        duration: "75 minutos",
        cost: 6500,
        comments: [],
    },
];


export {ServicesList};    export type { Service };

