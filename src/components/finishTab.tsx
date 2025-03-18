import React, { useState, useContext } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";
import { FinishClassList } from "./finishClassList";

export const FinishTab: React.FC = () => {
    const raceContext = useContext(RaceContext);
    return (
        <div className="page">
            {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                return (
                    <FinishClassList
                        raceIdx={raceContext.raceIdx}
                        classIdx={i}
                        forceUpdate={() => {}}
                        key={i} />
                )
            })}
        </div>
    );
};