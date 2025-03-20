import React, { useState, useContext } from "react";
import "./style.css";
import "./style/finishTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { FinishBoatEntry } from "./finishBoatEntry";

type StagingAreaProps = {
    stagedBoats: number[][],
    currentTime: number,
    stageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    unStageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    forceUpdate: () => void
};

export const StagingArea: React.FC<StagingAreaProps> = (props: StagingAreaProps) => {
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
                            Staging area
                        </div>
                    </div>
                </div>
                {expanded && (props.stagedBoats.length > 0 ? (
                    props.stagedBoats.map((entryArr, i) => {
                        return (
                            <FinishBoatEntry
                                raceIdx={entryArr[0]}
                                classIdx={entryArr[1]}
                                boatIdx={entryArr[2]}
                                stageBoat={props.stageBoat}
                                unStageBoat={props.unStageBoat}
                                currentTime={props.currentTime}
                                staged={true}
                                key={i} />
                        );
                    })
                ) : (
                    <div className="small-italics">
                        <br/>
                        <center>stage boats that are near to finish</center>
                        <br/>
                    </div>
                ))}
            </div>
        </>
    );
};