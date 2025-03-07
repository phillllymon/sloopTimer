import React, { useContext } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";

type NewBoatModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number
}

export const NewBoatModal: React.FC<NewBoatModalProps> = (props: NewBoatModalProps) => {
    const raceContext = useContext(RaceContext);
    const handleAddBoat = () => {
        const newBoatName = (document.getElementById("new-boat-name") as HTMLInputElement).value;
        const newSailNumber = (document.getElementById("new-boat-sail-number") as HTMLInputElement).value;
        const newPhrf = (document.getElementById("new-boat-phrf") as HTMLInputElement).value;
        const newNotes = (document.getElementById("new-boat-notes") as HTMLInputElement).value;
        if (newBoatName.length > 0) {
            const raceList = raceContext.raceList;
            raceList[props.raceIdx].classes[props.classIdx].boatList.push({
                name: newBoatName,
                sailNumber: newSailNumber,
                phrf: newPhrf ? Number.parseFloat(newPhrf) : 0,
                notes: newNotes
            });
            raceContext.setNewRaceList(raceList);
            props.hideModal();
            (document.getElementById("new-boat-name") as HTMLInputElement).value = "";
            (document.getElementById("new-boat-sail-number") as HTMLInputElement).value = "";
            (document.getElementById("new-boat-phrf") as HTMLInputElement).value = "";
            (document.getElementById("new-boat-notes") as HTMLInputElement).value = "";
        }
    };
    return (
        <>
            <div className="modal-screen" onClick={props.hideModal}></div>
            <div className="modal new-boat-modal">
                New boat info:
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="boat name"
                    id="new-boat-name">
                </input>
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="sail number"
                    id="new-boat-sail-number">
                </input>
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="PHRF"
                    id="new-boat-phrf">
                </input>
                <textarea
                    className="boat-notes-input"
                    placeholder="notes"
                    id="new-boat-notes">
                </textarea>
                <div
                    className="blue-button"
                    onClick={handleAddBoat}
                    >
                    Add boat
                </div>
            </div>
        </>
    );
};