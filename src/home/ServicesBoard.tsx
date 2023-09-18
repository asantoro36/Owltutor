import ServiceCard from "../components/ServiceCard";
import "./ServicesBoard.css";

export const ServicesBoard = () => {

    return (
        <div className="board">

            <div className="card-container">
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <ServiceCard></ServiceCard>
                    ))
                }
            </div>
        </div>
    )
}