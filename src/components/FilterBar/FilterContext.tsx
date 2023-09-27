import React, { createContext, useContext, useState, ReactNode } from "react";

export let INDIVIDUAL = 'individual'
export let GROUP = 'group'
export let UNIQUE = 'unique'
export let WEEKLY = 'weekly'
export let MONTHLY = 'monthly'
export let RATING = 'calif'
export let CATEGORY = 'category'

const FilterContext = createContext<any>({ filters: [], setFilters: () => {}, sliderValue: 0, setSliderValue: () => {} });

export function useFilterContext() {
    return useContext(FilterContext);
}

export function FilterProvider({ children }: { children: ReactNode }) {
    const [ filtersSelected, setFiltersSelected ] = useState([])
    const [ sliderValue, setSliderValue] = useState(0)
    const [ categorySelected, setCategorySelected] = useState(-1)
    const setFilters = (newFilters: any) => {
        setFiltersSelected(newFilters);
    };


    return (
        <FilterContext.Provider value={{ filters: filtersSelected, setFilters, sliderValue, setSliderValue, categorySelected, setCategorySelected }}>
            {children}
        </FilterContext.Provider>
    );
}

