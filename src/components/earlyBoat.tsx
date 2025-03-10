import React, { useContext, useState } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";

type EarlyBoatProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    clearStart: () => void,
    forceUpdate: () => void
};

export const EarlyBoat: React.FC<EarlyBoatProps> = (props: EarlyBoatProps) => {
    const raceContext = useContext(RaceContext);
    const boatName = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name;
    const clearBoat = () => {
        const raceList = raceContext.raceList;
        const overEarlyList = raceList[props.raceIdx].classes[props.classIdx].overEarly;
        raceList[props.raceIdx].classes[props.classIdx].overEarly = arrDelete(overEarlyList, boatName);
        if (raceList[props.raceIdx].classes[props.classIdx].overEarly.length === 0) {
            props.clearStart();
        }
        raceContext.setNewRaceList(raceList);
        props.forceUpdate();
    };
    
    return (
        <div className="boat-entry">
            <div>
                {boatName}
            </div>
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
            </div>
            <div className="blue-button background-orange" onClick={clearBoat}>
                Clear
            </div>
        </div>
    );
};

function arrDelete(arr: any[], val: any): any[] {
    let idx = -1;
    arr.forEach((ele, i) => {
        if (ele === val) {
            idx = i;
        }
    });
    if (idx > -1) {
        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1, arr.length);
        return before.concat(after);
    } else {
        return arr;
    }
}