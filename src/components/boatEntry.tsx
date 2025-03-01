import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { ClassList } from "./classList";

type BoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number
};

export const BoatEntry: React.FC<BoatEntryProps> = (props: BoatEntryProps) => {
    const raceContext = useContext(RaceContext);
    
    return (
        <div className="boat-entry">
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
            </div>
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
            </div>
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].notes}
            </div>
        </div>
    );
};