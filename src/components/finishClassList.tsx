import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { FinishBoatEntry } from "./finishBoatEntry";
import { SmallTimeDisplay } from "./smallTimeDisplay";

type FinishClassListProps = {
    raceIdx: number,
    classIdx: number,
    currentTime: number,
    stageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    unStageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    forceUpdate: () => void,
    rando: number
};

export const FinishClassList: React.FC<FinishClassListProps> = (props: FinishClassListProps) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);
    
    return (
        <>
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
                    <SmallTimeDisplay
                        raceIdx={props.raceIdx}
                        classIdx={props.classIdx}
                        currentTime={props.currentTime} />
                </div>
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return <FinishBoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={props.classIdx}
                            boatIdx={i}
                            stageBoat={props.stageBoat}
                            unStageBoat={props.unStageBoat}
                            currentTime={props.currentTime}
                            rando={props.rando}
                            forceUpdate={props.forceUpdate}
                            finished={boat.status === "finished"}
                            finishTime={boat.finishTime ? boat.finishTime : 0}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};