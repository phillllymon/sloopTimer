import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";
import { RaceListModal } from "./raceListModal";

export const RaceTitle: React.FC = () => {
    const raceContext = useContext(RaceContext);
    
    const [modalOpen, setModalOpen] = useState(false);
    const hideModal = () => {
        setModalOpen(false);
    };
    const handleShowModal = () => {
        setModalOpen(true);
    };

    const goFullScreen = () => {
        document.getElementById("full-screen-component")?.requestFullscreen();
    };

    useEffect(() => {
        if (false) {
        // if (!window.navigator.userAgent.includes("Android") && !window.navigator.userAgent.includes("iPhone")) {
            document.getElementById("full-screen-component")?.remove();
        } else {
            document.getElementById("window-frame")?.remove();
        }
    }, []);
    return (
        <div className="race-title horizontal-around">
            {modalOpen && <RaceListModal hideModal={hideModal} />}
            <div>
                {raceContext.raceIdx > -1 ? raceContext.raceList[raceContext.raceIdx].name : "no race"}
            </div>
            <div className="horizontal-right">
                <div className="blue-button" onClick={handleShowModal}>
                    Races
                </div>
                {window.navigator.userAgent.includes("Android") && <div className="blue-button" onClick={goFullScreen}>
                    Full
                </div>}
            </div>
        </div>
    );
};