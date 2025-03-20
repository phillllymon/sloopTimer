import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";
import { FinishClassList } from "./finishClassList";
import { StagingArea } from "./stagingArea";

export const FinishTab: React.FC = () => {

    // TODO - start here adding the same time pinging thing as in startTab - then trickle it down to the lists and the staging area

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
        <div className="page finish-page">
            <StagingArea 
                raceIdx={raceContext.raceIdx}
                forceUpdate={forceUpdate}
                currentTime={currentTime} />
            <div className="scroll-section">
                {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                    return (
                        <FinishClassList
                            raceIdx={raceContext.raceIdx}
                            classIdx={i}
                            forceUpdate={forceUpdate}
                            currentTime={currentTime}
                            key={i} />
                    )
                })}
            </div>
        </div>
    );
};