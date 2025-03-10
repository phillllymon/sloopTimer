import React, { useState, useContext } from "react";
import "./style.css";
import "./style/startTab.css";
import { RaceContext } from "./timerContainer";
import { OverEarlyModal } from "./overEarlyModal";
import { EarlyBoat } from "./earlyBoat";

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

    let startCleared = raceContext.raceList[props.raceIdx].classes[props.classIdx].cleared;

    const [earlyReported, setEarlyReported] = useState(startCleared ? true : raceContext.raceList[props.raceIdx].classes[props.classIdx].overEarly.length > 0 ? true : false);
    const [overEarlyModalOpen, setOverEarlyModalOpen] = useState(false);

    const handleClearStart = () => {
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].cleared = true;
        raceContext.setNewRaceList(raceList);
        setEarlyReported(true);
    };

    const reportEarly = () => {
        setEarlyReported(true);
        if (raceContext.raceList[props.raceIdx].classes[props.classIdx].overEarly.length === 0) {
            handleClearStart();
        }
    };

    const [rando, setRando] = useState(Math.random());
    const forceUpdate = () => {
        setRando(Math.random());
    };
    return (
        <div>
            {overEarlyModalOpen && <OverEarlyModal 
                raceIdx={props.raceIdx}
                classIdx={props.classIdx}
                reportEarly={reportEarly}
                hideModal={() => setOverEarlyModalOpen(false)} />}
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
                                <>
                                    <div>
                                        {raceContext.raceList[props.raceIdx].classes[props.classIdx].overEarly.map((boatName, i) => {
                                            let boatIdx: number | false = false;
                                            raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.forEach((boatEntry, idx) => {
                                                if (boatEntry.name === boatName) {
                                                    boatIdx = idx;
                                                }
                                            });
                                            if (boatIdx !== false) {
                                                return (
                                                    <div key={i}>
                                                        <EarlyBoat
                                                            raceIdx={props.raceIdx}
                                                            classIdx={props.classIdx}
                                                            boatIdx={boatIdx}
                                                            clearStart={handleClearStart}
                                                            forceUpdate={forceUpdate} />
                                                    </div>
                                                );
                                            } else {
                                                return "";
                                            }
                                        })}
                                    </div>
                                    <div className="blue-button" onClick={() => setOverEarlyModalOpen(true)}>
                                        + Early boats
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="horizontal-center">
                            <div className="blue-button" onClick={handleClearStart}>
                                All clear
                            </div>
                            <div className="space"></div>
                            <div className="space"></div>
                            <div className="blue-button" onClick={() => setOverEarlyModalOpen(true)}>
                                Over early
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
    
};