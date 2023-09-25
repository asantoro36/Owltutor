import React, { createContext, useContext, useState, ReactNode } from "react";

let INDIVIDUAL = 'individual'
let GROUP = 'group'
let UNIQUE = 'unique'
let WEEKLY = 'weekly'
let MONTHLY = 'monthly'
let REGULAR = 'regular'
let GOOD = 'good'
let VERY_GOOD = 'veryGood'

const filtersSelectedStatus = new Map([
    [INDIVIDUAL, false],
    [GROUP, false],
    [UNIQUE, false],
    [WEEKLY, false],
    [MONTHLY, false],
    [REGULAR, false],
    [GOOD, false],
    [VERY_GOOD, false]
]);

const FilterContext = createContext<any>({ filters: filtersSelectedStatus, setFilters: () => {} });


export function useFilterContext() {
    return useContext(FilterContext);
}

export function FilterProvider({ children }: { children: ReactNode }) {
    const [filtersStatus, setFiltersStatus] = useState(filtersSelectedStatus);

    const setFilters = (newFilters: any) => {
        setFiltersStatus(newFilters);
    };

    return (
        <FilterContext.Provider value={{ filters: filtersStatus, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
}

