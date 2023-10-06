import React, { createContext, useContext, useState, ReactNode } from "react";
import {Service} from "../entities/Service";

const ServiceContext = createContext<any>({ serviceToEdit: null, setServiceToEdit: () => {}, });

export function useServiceContext() {
    return useContext(ServiceContext);
}

export function ServiceProvider({ children }: { children: ReactNode }) {
    const [ serviceToEdit, setServiceToEdit ] = useState<Service | null>(null)

    return (
        <ServiceContext.Provider value={{ serviceToEdit, setServiceToEdit }}>
            {children}
        </ServiceContext.Provider>
    );
}

