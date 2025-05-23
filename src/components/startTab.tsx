import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { ClassStart } from "./classStart";

export const StartTab: React.FC = () => {
    const raceContext = useContext(RaceContext);
    
    const [rando, setRando] = useState(Math.random());  // hack to force rerender - see setRando(Math.random()) in handleAddNewClass
    const [currentTime, setCurrentTime] = useState(raceContext.currentTime + (Date.now() - raceContext.lastUpdateTime));
    const forceUpdate = () => {
        setRando(Math.random());
    };
    
    useEffect(() => {
        const pingInterval = setInterval(() => {
            setCurrentTime(raceContext.currentTime + (Date.now() - raceContext.lastUpdateTime));
        }, 1000);

        // returned function gets run when component unmounts - i.e. cleanup
        return () => {
            clearInterval(pingInterval);
        };
    }, []);
    
    return (
        <div className="page">
            {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                return (
                    <ClassStart
                        raceIdx={raceContext.raceIdx}
                        classIdx={i}
                        forceUpdate={forceUpdate}
                        currentTime={currentTime}
                        key={i} />
                )
            })}
        </div>
    );
};