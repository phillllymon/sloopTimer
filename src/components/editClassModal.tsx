import React, { useContext, useState } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";

type NewBoatModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number,
    forceUpdate: () => void
}

export const EditClassModal: React.FC<NewBoatModalProps> = (props: NewBoatModalProps) => {
    const raceContext = useContext(RaceContext);
    const [className, setClassName] = useState(raceContext.raceList[props.raceIdx].classes[props.classIdx].name);
    const handleDeleteClass = () => {
        const classes = raceContext.raceList[props.raceIdx].classes;
        const beforeClasses = classes.slice(0, props.classIdx);
        const afterClasses = classes.slice(props.classIdx + 1, classes.length);
        const newClasses = beforeClasses.concat(afterClasses);
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes = newClasses;
        raceContext.setNewRaceList(raceList);
        props.forceUpdate();
        props.hideModal();
    };
    const handleDeleteBoat = (i: number) => {
        const boats = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList;
        const beforeBoats = boats.slice(0, i);
        const afterBoats = boats.slice(i + 1, boats.length);
        const newBoatList = beforeBoats.concat(afterBoats);
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].boatList = newBoatList;
        raceContext.setNewRaceList(raceList);
        props.forceUpdate();
    };
    const saveNameChangeAndCloseModal = () => {
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].name = className;
        raceContext.setNewRaceList(raceList);
        props.forceUpdate();
        props.hideModal();
    };
    
    return (
        <>
            <div className="modal-screen" onClick={saveNameChangeAndCloseModal}></div>
            <div className="modal new-boat-modal">
                <div className="horizontal-between">
                    <input
                        type="text"
                        className="new-boat-input"
                        id="edit-class-name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}>
                    </input>
                    <div className="blue-button" onClick={saveNameChangeAndCloseModal}>
                        Done
                    </div>
                </div>
                <div className="class-list modal-content">
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return (
                            <div className="boat-entry" key={i}>
                                {boat.name}
                                <div className="blue-button" onClick={() => handleDeleteBoat(i)}>
                                    Delete
                                </div>
                            </div>
                        ) 
                    })}
                </div>
                <div className="horizontal-between">

                    <div className="blue-button" onClick={handleDeleteClass}>
                        Delete class
                    </div>
                    <div className="blue-button" onClick={saveNameChangeAndCloseModal}>
                        Done
                    </div>
                </div>
            </div>
        </>
    );
};