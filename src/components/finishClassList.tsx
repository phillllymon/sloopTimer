import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { Edit } from "./icons/edit";
import { FinishBoatEntry } from "./finishBoatEntry";
import { NewBoatModal } from "./newBoatModal";
import { EditClassModal } from "./editClassModal";

type FinishClassListProps = {
    raceIdx: number,
    classIdx: number,
    forceUpdate: () => void
};

export const FinishClassList: React.FC<FinishClassListProps> = (props: FinishClassListProps) => {
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
                </div>
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return <FinishBoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={props.classIdx}
                            boatIdx={i}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};