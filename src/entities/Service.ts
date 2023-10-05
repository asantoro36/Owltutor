interface Service {
    id: number;
    title: string;
    category: string;
    description: string;
    type: string; // Puede ser 'Individual' o 'Grupal'
    frequency: string; // Puede ser 'única', 'semanal', o 'mensual'
    rating: number;
    responsible: string;
    responsibleExperience: string,
    duration: string;
    days: string[],
    cost: number;
    comments: string[];
}

const ServicesList: Service[] = [
    {
        id: 0,
        title: "Clases de Matemáticas",
        category: "Tutorías escolares",
        description: "Apoyo en matemáticas para estudiantes de primaria y secundaria.",
        type: "INDIVIDUAL",
        frequency: "WEEKLY",
        rating: 4.5,
        responsible: "Ana Fonseca",
        responsibleExperience: "Soy Ana, y tengo un título en Educación Matemática y más de 10 años de experiencia enseñando matemáticas en escuelas locales. He ayudado a cientos de estudiantes a mejorar sus habilidades matemáticas y alcanzar el éxito académico.",
        duration: "60 minutos",
        days: ["MON", "WED"],
        cost: 800,
        comments: []
    },
    {
        id: 1,
        title: "Clases de Inglés",
        category: "Idiomas",
        description: "Aprende inglés de forma efectiva y divertida.",
        type: "GROUP",
        frequency: "WEEKLY",
        rating: 4.8,
        responsible: "David English",
        responsibleExperience: "Profesor de inglés certificado con 8 años de experiencia. He enseñado en escuelas de idiomas y he trabajado con empresas internacionales, ayudando a mis estudiantes a dominar el inglés y alcanzar sus metas comunicativas.",
        duration: "90 minutos",
        days: ["TUE", "THU"],
        cost: 600,
        comments: []
    },
    {
        id: 2,
        title: "Clases de Piano",
        category: "Música",
        description: "Lecciones de piano para principiantes y avanzados.",
        type: "INDIVIDUAL",
        frequency: "WEEKLY",
        rating: 4.9,
        responsible: "Elena Vargas",
        responsibleExperience: "Soy Elena, una pianista profesional con más de 15 años de experiencia en la interpretación y la enseñanza de piano. Tengo un grado en Música y he actuado en conciertos internacionales, compartiendo mi pasión por la música con mis estudiantes.",
        duration: "45 minutos",
        days: ["FRI"],
        cost: 1200,
        comments: []
    },
    {
        id: 3,
        title: "Clases de Salsa",
        category: "Baile",
        description: "Aprende a bailar salsa con pasión y estilo.",
        type: "GROUP",
        frequency: "WEEKLY",
        rating: 4.7,
        responsible: "Carlos Romero",
        responsibleExperience: "Soy Carlos, un bailarín y coreógrafo de salsa con renombre internacional. He trabajado como instructor de baile en prestigiosas academias y he coreografiado espectáculos en todo el mundo. Mi pasión por la salsa es contagiosa y la comparto en cada clase.",
        duration: "60 minutos",
        days: ["SAT"],
        cost: 1000,
        comments: []
    },
    {
        id: 4,
        title: "Entrenamiento Personalizado",
        category: "Actividad física",
        description: "Entrenamiento personalizado para lograr tus metas de fitness.",
        type: "INDIVIDUAL",
        frequency: "WEEKLY",
        rating: 4.6,
        responsible: "María Sanchez",
        responsibleExperience: "Soy María, una entrenadora certificada en fitness con más de 7 años de experiencia. He trabajado con atletas de alto rendimiento y personas de todas las edades para ayudarles a alcanzar sus objetivos de salud y bienestar. Mi enfoque es personalizado y orientado a resultados.",
        duration: "75 minutos",
        days: ["MON", "WED", "FRI"],
        cost: 1500,
        comments: []
    },
    {
        id: 5,
        title: "Clases de Tenis",
        category: "Deportes",
        description: "Lecciones de tenis para todos los niveles.",
        type: "GROUP",
        frequency: "WEEKLY",
        rating: 4.4,
        responsible: "Juan Perez",
        responsibleExperience: "Soy Juan, un extenista profesional con una amplia trayectoria en el circuito internacional. Además de mi experiencia en competencias, tengo más de 5 años de experiencia como entrenador de tenis, ayudando a mis estudiantes a mejorar su juego y disfrutar del tenis.",
        duration: "90 minutos",
        days: ["TUE", "THU"],
        cost: 700,
        comments: []
    },
    {
        id: 6,
        title: "Diseño de Logotipos",
        category: "Diseño Gráfico",
        description: "Servicio de diseño de logotipos para empresas y emprendedores.",
        type: "INDIVIDUAL",
        frequency: "UNIQUE",
        rating: 4.9,
        responsible: "Luis Gonzales",
        responsibleExperience: "Soy Luis, un diseñador gráfico con más de 12 años de experiencia en branding y diseño de logotipos. He trabajado con empresas de renombre y startups para crear identidades visuales sólidas y atractivas.",
        duration: "120 minutos",
        days: ["FRI"],
        cost: 1800,
        comments: []
    },
    {
        id: 7,
        title: "Desarrollo Web Personalizado",
        category: "Programación",
        description: "Desarrollo de sitios web personalizados según tus necesidades.",
        type: "INDIVIDUAL",
        frequency: "UNIQUE",
        rating: 1.8,
        responsible: "Laura Linas",
        responsibleExperience: "Soy Laura, una desarrolladora web con más de 8 años de experiencia en proyectos personalizados. He trabajado con empresas de diversos sectores y he entregado soluciones web de alta calidad y rendimiento.",
        duration: "180 minutos",
        days: ["SAT"],
        cost: 2000,
        comments: []
    },
    {
        id: 8,
        title: "Asesoría Financiera Personalizada",
        category: "Consultoría financiera",
        description: "Recibe asesoramiento financiero personalizado para gestionar tus finanzas de manera efectiva.",
        type: "INDIVIDUAL",
        frequency: "MONTHLY",
        rating: 4.7,
        responsible: "Javier Toledo",
        responsibleExperience: "Soy Javier, un asesor financiero con más de 15 años de experiencia en instituciones bancarias de renombre. He ayudado a individuos y familias a alcanzar sus metas financieras a través de estrategias de inversión y planificación fiscal personalizadas.",
        duration: "90 minutos",
        days: ["First Monday of the month"],
        cost: 1800,
        comments: []
    },
    {
        id: 9,
        title: "Diseño de Interiores Residenciales",
        category: "Diseño de interiores",
        description: "Transforma tu hogar en un espacio hermoso y funcional con servicios de diseño de interiores.",
        type: "INDIVIDUAL",
        frequency: "UNIQUE",
        rating: 4.1,
        responsible: "Eva Zamora",
        responsibleExperience: "Soy Eva, una diseñadora de interiores con una sólida formación y más de 10 años de experiencia en diseño residencial. He trabajado en proyectos de viviendas y apartamentos de lujo, creando ambientes que reflejan la personalidad y las necesidades de mis clientes.",
        duration: "180 minutos",
        days: ["MON","TUE","WED","FRI"],
        cost: 2500,
        comments: []
    },
    {
        id: 10,
        title: "Entrenamiento en Marketing Digital",
        category: "Marketing digital",
        description: "Domina las estrategias de marketing en línea con un entrenamiento práctico y orientado a resultados.",
        type: "GROUP",
        frequency: "WEEKLY",
        rating: 2.6,
        responsible: "Marta Alvarez",
        responsibleExperience: "Soy Marta, una experta en marketing digital con una amplia trayectoria en agencias de marketing y startups exitosas. Durante los últimos 7 años, he dirigido campañas exitosas en línea y he ayudado a empresas a aumentar su presencia digital y sus ventas.",
        duration: "90 minutos",
        days: ["TUE", "THU"],
        cost: 1200,
        comments: []
    }
];

export {ServicesList};    export type { Service };
