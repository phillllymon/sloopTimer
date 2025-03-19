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
    forceUpdate: () => void
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
                            currentTime={props.currentTime}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};