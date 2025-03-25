import React, { useContext, useState } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";

type EditBoatModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number,
    boatIdx: number
}

export const EditBoatModal: React.FC<EditBoatModalProps> = (props: EditBoatModalProps) => {
    const raceContext = useContext(RaceContext);
    const boatInfo = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx];
    const [boatName, setBoatName] = useState(boatInfo.name);
    const [sailNumber, setSailNumber] = useState(boatInfo.sailNumber ? boatInfo.sailNumber : "");
    const [phrf, setPhrf] = useState(boatInfo.phrf ? boatInfo.phrf?.toString() : "0");
    const [notes, setNotes] = useState(boatInfo.notes ? boatInfo.notes : "");
    const handleDone = () => {
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name = boatName;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber = sailNumber;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].phrf = Number.parseFloat(phrf);
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].notes = notes;
        raceContext.setNewRaceList(raceList);
        props.hideModal();
    };
    return (
        <>
            <div className="modal-screen" onClick={handleDone}></div>
            <div className="modal new-boat-modal">
                Boat name
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="boat name"
                    value={boatName}
                    onChange={(e) => setBoatName(e.target.value)}>
                </input>
                Sail number
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="sail number"
                    value={sailNumber}
                    onChange={(e) => setSailNumber(e.target.value)}>
                </input>
                PHRF
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="PHRF"
                    value={phrf}
                    onChange={(e) => setPhrf(e.target.value)}>
                </input>
                Notes
                <textarea
                    className="boat-notes-input"
                    placeholder="notes"
                    id="new-boat-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}>
                </textarea>
                <div
                    className="blue-button"
                    onClick={handleDone}
                    >
                    Done
                </div>
            </div>
        </>
    );
};