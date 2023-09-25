import React, { createContext, useContext, useState, ReactNode } from "react";

export let INDIVIDUAL = 'individual'
export let GROUP = 'group'
export let UNIQUE = 'unique'
export let WEEKLY = 'weekly'
export let MONTHLY = 'monthly'
export let REGULAR = 'regular'
export let GOOD = 'good'
export let VERY_GOOD = 'veryGood'

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

