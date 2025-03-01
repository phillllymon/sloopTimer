import React, { useState, useContext } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";
import { RaceListModal } from "./raceListModal";

export const RaceTitle: React.FC = () => {
    const raceContext = useContext(RaceContext);
    
    const [modalOpen, setModalOpen] = useState(false);
    const hideModal = () => {
        setModalOpen(false);
    }
    const handleShowModal = () => {
        setModalOpen(true);
    }
    return (
        <div className="race-title">
            {modalOpen && <RaceListModal hideModal={hideModal} />}
            <div>
                {raceContext.raceIdx > -1 ? raceContext.raceList[raceContext.raceIdx].name : "no race"}
            </div>
            <div className="blue-button" onClick={handleShowModal}>
                Switch race
            </div>
        </div>
    );
};