import React, { createContext, useContext, useState, ReactNode } from "react";

export let INDIVIDUAL = 'individual'
export let GROUP = 'group'
export let UNIQUE = 'unique'
export let WEEKLY = 'weekly'
export let MONTHLY = 'monthly'
export let RATING = 'calif'

const FilterContext = createContext<any>({ filters: [], setFilters: () => {}, sliderValue: 0, setSliderValue: () => {} });

export function useFilterContext() {
    return useContext(FilterContext);
}

export function FilterProvider({ children }: { children: ReactNode }) {
    const [ filtersSelected, setFiltersSelected ] = useState([])
    const [ sliderValue, setSliderValue] = useState(0)
    const setFilters = (newFilters: any) => {
        setFiltersSelected(newFilters);
    };


    return (
        <FilterContext.Provider value={{ filters: filtersSelected, setFilters, sliderValue, setSliderValue }}>
            {children}
        </FilterContext.Provider>
    );
}

