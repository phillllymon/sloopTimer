import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { BoatEntry } from "./boatEntry";
import { NewBoatModal } from "./newBoatModal";

type ClassListProps = {
    raceIdx: number,
    classIdx: number
};

export const ClassList: React.FC<ClassListProps> = (props: ClassListProps) => {
    const [newBoatModalOpen, setNewBoatModalOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);
    
    return (
        <>
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
                    <div className="blue-button" onClick={() => setNewBoatModalOpen(true)}>
                        + Boat
                    </div>
                </div>
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boatClass, i) => {
                        return <BoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={props.raceIdx}
                            boatIdx={i}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};