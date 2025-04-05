import React, { useContext } from "react";
import "./style.css";
import "./style/resultsTab.css";
import { RaceContext } from "./timerContainer";

type ResultsBoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    labelsObj: Record<string, boolean>
};

export const ResultsBoatEntry: React.FC<ResultsBoatEntryProps> = (props: ResultsBoatEntryProps) => {
    const raceContext = useContext(RaceContext);

    const boatFinishTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime;
    
    if (!boatFinishTime) {
        return (<></>);
    }

    const finishDateObj = new Date(boatFinishTime);
    let seconds = finishDateObj.getSeconds();
    let minutes = finishDateObj.getMinutes();
    let hours = finishDateObj.getHours();

    let dateDisplay: string | false = false;
    const todayDateObj = new Date(Date.now());
    if (todayDateObj.getFullYear() !== finishDateObj.getFullYear() || todayDateObj.getDate() !== finishDateObj.getDate() || todayDateObj.getMonth() !== finishDateObj.getMonth()) {
        dateDisplay = finishDateObj.toLocaleDateString();
    }

    const startDate = raceContext.raceList[props.raceIdx].startDay;
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
    const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
    const startTimeMs = startTimeDateObj.getTime();
    const courseTimeMs = boatFinishTime - startTimeMs;

    const boatName = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name;
    const sailNumber = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber;
    const boatClass = raceContext.raceList[props.raceIdx].classes[props.classIdx].name;
    const phrf = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].phrf;
    const boatType = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].boatType;
    const boatId = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].boatId;
    const finishTime = dateDisplay ? `${dateDisplay} - ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
    const courseTime = stringTimeFromMs(courseTimeMs);

    return (
        <div className="results-boat-entry">
            <div>
                {props.labelsObj["name"] && (
                    <div className="text-gray finish-label-item">
                        {boatName}
                    </div>
                )}
                {props.labelsObj["sailNumber"] && (
                    <div className="finish-label-item">
                        Sail number: {sailNumber}
                    </div>
                )}
                {props.labelsObj["class"] && (
                    <div className="finish-label-item">
                        Class: {boatClass}
                    </div>
                )}
                {props.labelsObj["phrf"] && (
                    <div className="finish-label-item">
                        PHRF: {phrf}
                    </div>
                )}
                {props.labelsObj["boatType"] && (
                    <div className="finish-label-item">
                        Boat type: {boatType}
                    </div>
                )}
                {props.labelsObj["boatId"] && (
                    <div className="finish-label-item">
                        ID: {boatId}
                    </div>
                )}
                {props.labelsObj["finishTime"] && (
                    <div className="finish-label-item">
                        Finish time: {finishTime}
                    </div>
                )}
                {props.labelsObj["courseTime"] && (
                    <div className="finish-label-item">
                        Course time: {courseTime}
                    </div>
                )}
            </div>
        </div>
    );
};

function formatTwoDigits(n: number): string {
    if (n < 10) {
        return `0${n}`;
    } else {
        return `${n}`;
    }
}

function thousandthRound(n: number): number {
    const bigger = 1000.0 * n;
    const rounded = Math.round(bigger);
    return rounded / 1000;
}

function stringTimeFromMs(ms: number): string {
    const days = Math.floor(ms / 86400000);
    const dayTime = ms % 86400000;
    const hours = Math.floor(dayTime / 3600000);
    const hourTime = dayTime % 3600000;
    const minutes = Math.floor(hourTime / 60000);
    const minuteTime = hourTime % 60000;
    const seconds = thousandthRound(minuteTime / 1000);
    const dayDisplay = days > 0 ? `${days} ${days > 1 ? "days" : "day"} + ` : "";
    return `${dayDisplay}${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${seconds}`;
}