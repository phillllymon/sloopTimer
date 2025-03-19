import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";

type SmallTimeDisplayProps = {
    raceIdx: number,
    classIdx: number,
    currentTime: number
}

export const SmallTimeDisplay: React.FC<SmallTimeDisplayProps> = (props: SmallTimeDisplayProps) => {
    const raceContext = useContext(RaceContext);
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime!;
    const startDate = raceContext.raceList[props.raceIdx].startDay;

    const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
    const startTimeMs = startTimeDateObj.getTime();

    const officialTimeToUse = props.currentTime;

    let msTillStart = startTimeMs - officialTimeToUse;
    let absDiffTime = Math.abs(msTillStart);
    let absSeconds = absDiffTime / 1000;

    const [days, setDays] = useState(Math.floor(absSeconds / 86400));
    const [hours, setHours] = useState(Math.floor((absSeconds % 86400) / 3600));
    const [minutes, setMinutes] = useState(Math.floor((absSeconds % 3600) / 60));
    const [seconds, setSeconds] = useState(Math.floor(absSeconds % 60));

    useEffect(() => {
        const officialTimeToUse = props.currentTime;

        let msTillStart = startTimeMs - officialTimeToUse;
        let absDiffTime = Math.abs(msTillStart);
        let absSeconds = absDiffTime / 1000;

        setDays(Math.floor(absSeconds / 86400));
        setHours(Math.floor((absSeconds % 86400) / 3600));
        // setHours(Math.floor(absSeconds / 3600));
        setMinutes(Math.floor((absSeconds % 3600) / 60));
        setSeconds(Math.floor(absSeconds % 60));
    }, [props.currentTime]);

    const hoursA = (Math.floor(hours / 10)).toString();
    const hoursB = (hours % 10).toString();
    const minutesA = (Math.floor(minutes / 10)).toString();
    const minutesB = (minutes % 10).toString();
    const secondsA = (Math.floor(seconds / 10)).toString();
    const secondsB = (seconds % 10).toString();
    
    return (
        <>
            <div className="vertical-space"></div>
            <div className="vertical-space"></div>
            <div className="vertical-space"></div>
            <div className="vertical">
            {days > 0 && (
                <div className={msTillStart > 0 ? "red-text" : "green-text"}>
                    {days} {days > 1 ? "days" : "day"} +
                </div>
            )}
                <div className="horizontal-left">
                    <div className="space"></div>
                    <div className="vertical-center">
                        <div className="horizontal-center">
                            <div className="mini-digit-box">
                                <div className={msTillStart > 0 ? "red" : "green"}>
                                    {hoursA}
                                </div>
                            </div>
                            <div className="mini-space"></div>
                            <div className="mini-digit-box">
                                <div className={msTillStart > 0 ? "red" : "green"}>
                                    {hoursB}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div>:</div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="horizontal-center">
                            <div className="mini-digit-box">
                                <div className={msTillStart > 0 ? "red" : "green"}>
                                    {minutesA}
                                </div>
                            </div>
                            <div className="mini-space"></div>
                            <div className="mini-digit-box">
                                <div className={msTillStart > 0 ? "red" : "green"}>
                                    {minutesB}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div>:</div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="horizontal-center">
                            <div className="mini-digit-box">
                                <div className={msTillStart > 0 ? "red" : "green"}>
                                    {secondsA}
                                </div>
                            </div>
                            <div className="mini-space"></div>
                            <div className="mini-digit-box">
                                <div className={msTillStart > 0 ? "red" : "green"}>
                                    {secondsB}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};