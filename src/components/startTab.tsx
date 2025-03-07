import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { ClassStart } from "./classStart";

export const StartTab: React.FC = () => {
    const raceContext = useContext(RaceContext);
    const [rando, setRando] = useState(Math.random());  // hack to force rerender - see setRando(Math.random()) in handleAddNewClass
    const forceUpdate = () => {
        setRando(Math.random());
    };
    
    
    return (
        <div className="page">
            {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                return (
                    <ClassStart
                        raceIdx={raceContext.raceIdx}
                        classIdx={i}
                        forceUpdate={forceUpdate}
                        key={i} />
                )
            })}
        </div>
    );
};