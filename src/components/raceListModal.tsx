import React, { useContext } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";

type RaceListModalProps = {
    hideModal: () => void
}

export const RaceListModal: React.FC<RaceListModalProps> = (props: RaceListModalProps) => {
    const raceContext = useContext(RaceContext);
    const handleSelectRace = (idx: number): void => {
        raceContext.setRaceIdx(idx);
        props.hideModal();
    };
    const handleAddNewRace = () => {
        const newRaceName = (document.getElementById("new-race-name") as HTMLInputElement).value;
        if (newRaceName.length > 0) {
            const raceList = raceContext.raceList;
            const today = new Date(Date.now());
            const newRace = {
                name: newRaceName,
                startDay: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                },
                classes: [],
            };
            raceList.push(newRace);
            raceContext.setNewRaceList(raceList);
            raceContext.setRaceIdx(raceList.length - 1);
            props.hideModal();
        }
    };
    return (
        <>
            <div className="modal-screen" onClick={props.hideModal}></div>
            <div className="modal">
                <br />
                {raceContext.raceList.map((race, i) => {
                    return (
                        <div
                            className="blue-button modal-list-button"
                            onClick={() => handleSelectRace(i)}
                            key={i}>
                            {race.name}
                        </div>
                    );
                })}
                <div className="add-race">

                    <input
                        type="text"
                        className="race-name-input"
                        placeholder="add new"
                        id="new-race-name">
                    </input>
                    <div
                        className="blue-button race-add-button"
                        onClick={handleAddNewRace}
                        >
                        +
                    </div>
                </div>
            </div>
        </>
    );
};