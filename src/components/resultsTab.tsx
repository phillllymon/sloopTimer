import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";
import { ResultsClassList } from "./resultsClassList";

export const ResultsTab: React.FC = () => {

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
            <div className="scroll-section">
                <center>
                    {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                        return (
                            <ResultsClassList
                                raceIdx={raceContext.raceIdx}
                                classIdx={i}
                                forceUpdate={forceUpdate}
                                rando={rando}
                                key={i} />
                        )
                    })}
                </center>
            </div>
        </div>
    );
};