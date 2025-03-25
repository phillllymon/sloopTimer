import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { ResultsBoatEntry } from "./resultsBoatEntry";

type ResultsClassListProps = {
    raceIdx: number,
    classIdx: number,
    currentTime: number,
    stageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    unStageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    forceUpdate: () => void,
    rando: number
};

export const ResultsClassList: React.FC<ResultsClassListProps> = (props: ResultsClassListProps) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);
    const boats = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList;
    const numBoats = boats.length;
    let numFinished = 0;
    raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.forEach((boat) => {
        if (boat.finishTime) {
            numFinished += 1;
        }
    });
    
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
                    <div className="vertical">
                        <div>
                            {numFinished} / {numBoats}
                        </div>
                        <div className="gray-text small-text">
                            finished
                        </div>
                    </div>
                </div>
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return <ResultsBoatEntry 
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