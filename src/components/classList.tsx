import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { Edit } from "./icons/edit";
import { BoatEntry } from "./boatEntry";
import { NewBoatModal } from "./newBoatModal";
import { EditClassModal } from "./editClassModal";

type ClassListProps = {
    raceIdx: number,
    classIdx: number,
    forceUpdate: () => void,
    rando: number
};

export const ClassList: React.FC<ClassListProps> = (props: ClassListProps) => {
    const [newBoatModalOpen, setNewBoatModalOpen] = useState(false);
    const [editClassModalOpen, setEditClassModalOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);
    
    return (
        <>
            {editClassModalOpen && <EditClassModal 
                hideModal={() => setEditClassModalOpen(false)}
                raceIdx={props.raceIdx}
                classIdx={props.classIdx}
                forceUpdate={props.forceUpdate}
                openNewBoatModal={() => setNewBoatModalOpen(true)}
                />}
            {newBoatModalOpen && <NewBoatModal 
                hideModal={() => setNewBoatModalOpen(false)}
                raceIdx={props.raceIdx}
                classIdx={props.classIdx} 
                />}
            <div className="class-list">
                <div className="horizontal-between">
                    <div className="horizontal-left">
                        <div className="arrow-button" onClick={handleExpand}>
                            {expanded ? <DownArrow /> : <RightArrow />}
                        </div>
                        <div className="class-title">
                            {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].name}
                        </div>
                    </div>
                    <div className="horizontal-right">
                        <div className="blue-button" onClick={() => setEditClassModalOpen(true)}>
                            <Edit />
                        </div>
                        <div className="space">
                        </div>
                    </div>
                </div>
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return <BoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={props.classIdx}
                            boatIdx={i}
                            rando={props.rando}
                            forceUpdate={props.forceUpdate}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};