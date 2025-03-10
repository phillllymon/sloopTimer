import React, { useState, useContext } from "react";
import "./style.css";
import "./style/startTab.css";
import { RaceContext } from "./timerContainer";

type StartClearToolProps = {
    raceIdx: number,
    classIdx: number,
    currentTime: number
}

export const StartClearTool: React.FC<StartClearToolProps> = (props: StartClearToolProps) => {
    const raceContext = useContext(RaceContext);
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime!;
    const startDate = raceContext.raceList[props.raceIdx].startDay;

    const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
    const startTimeMs = startTimeDateObj.getTime();

    const officialTimeToUse = props.currentTime;
    const started = officialTimeToUse > startTimeMs;

    const startCleared = raceContext.raceList[props.raceIdx].classes[props.classIdx].cleared;

    const [earlyReported, setEarlyReported] = useState(startCleared ? true : raceContext.raceList[props.raceIdx].classes[props.classIdx].overEarly.length > 0 ? true : false);

    const handleClearStart = () => {
        console.log("clear start");
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].cleared = true;
        raceContext.setNewRaceList(raceList);
        setEarlyReported(true);
    };
    return (
        <div>
            <div className="vertical-space"></div>
            {started && (
                <div>
                    {earlyReported ? (
                        <div>
                            {startCleared ? (
                                <div>
                                    All clear
                                </div>
                            ) : (
                                <div>
                                    over early list
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="horizontal-center">
                            <div className="blue-button" onClick={handleClearStart}>
                                All clear
                            </div>
                            <div className="space"></div>
                            <div className="space"></div>
                            <div className="blue-button">
                                Over early
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
    
};