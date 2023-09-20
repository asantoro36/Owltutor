import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";

export const ServicesBoard = () => {

    return (
        <div className="board">

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