import React, { useState, useContext } from "react";
import "./style.css";
import "./style/finishTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";

type StagingAreaProps = {
    raceIdx: number,
    currentTime: number,
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
                {expanded && <div className="small-italics">
                    <br/>
                    <center>drag boats here to stage them for finish</center>
                    <br/>
                </div>}
            </div>
        </>
    );
};