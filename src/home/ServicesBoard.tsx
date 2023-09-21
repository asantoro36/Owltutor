import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";
import FilterBar from "../components/FilterBar/FilterBar";

export const ServicesBoard = () => {


    return (
        <div className="board">
            <div className="filter-bar">
                <FilterBar/>
            </div>
            <div className={'card-container columns'}>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <ServiceCard></ServiceCard>
                    ))
                }
            </div>
        </div>
    )
}