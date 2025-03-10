import React, { useContext, useState } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";

type BoatSelectEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    onSelect: () => void
};

export const BoatSelectEntry: React.FC<BoatSelectEntryProps> = (props: BoatSelectEntryProps) => {
    const raceContext = useContext(RaceContext);
    const boatName = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name;
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        setSelected(selected ? false : true);
        const raceList = raceContext.raceList;
        if (selected) {
            raceList[props.raceIdx].classes[props.classIdx].overEarly.push(boatName);
        } else {
            arrDelete(raceList[props.raceIdx].classes[props.classIdx].overEarly, boatName);
        }
        raceContext.setNewRaceList(raceList);
        props.onSelect();
    };
    return (
        <div className={selected ? "boat-entry selected" : "boat-entry"} onClick={handleSelect}>
            <div>
                {boatName}
            </div>
            <div></div>
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
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