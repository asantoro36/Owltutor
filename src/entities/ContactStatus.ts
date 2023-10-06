interface IStatus {
    id: string;
    name: string;
}

export const statuses: IStatus[] = [
    {id: 'PENDING', name: "Pendiente"},
    {id: 'APPROVED', name: "Aceptado"},
    {id: 'FINISHED', name: "Finalizado"},
    {id: 'CANCELED', name: "Cancelado"}
]