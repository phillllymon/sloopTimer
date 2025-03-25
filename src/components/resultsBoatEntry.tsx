import React, { useContext } from "react";
import "./style.css";
import "./style/resultsTab.css";
import { RaceContext } from "./timerContainer";

type ResultsBoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
};

export const ResultsBoatEntry: React.FC<ResultsBoatEntryProps> = (props: ResultsBoatEntryProps) => {
    const raceContext = useContext(RaceContext);

    const boatFinishTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime;
    
    if (!boatFinishTime) {
        return (<></>);
    }

    let seconds = (boatFinishTime % 60000) / 1000;
    let minutes = Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000) - (Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000);
    let hours = Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000)) / 3600000);
    let days = Math.floor(boatFinishTime / 86400000);

    let correctedSeconds = seconds;
    let correctedMinutes = minutes;
    let correctedHours = hours;
    let correctedDays = days;

    let correctedTime: false | number = false;
    
    const phrf = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].phrf;
    if (phrf) {
        const correctionFactor = 650 / (550 + phrf);
        correctedTime = boatFinishTime * correctionFactor;

        correctedSeconds = (correctedTime % 60000) / 1000;
        correctedMinutes = Math.floor((correctedTime - (Math.floor(correctedTime / 86400000) * 86400000) - (Math.floor((correctedTime - (Math.floor(correctedTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000);
        correctedHours = Math.floor((correctedTime - (Math.floor(correctedTime / 86400000) * 86400000)) / 3600000);
        correctedDays = Math.floor(correctedTime / 86400000);

        correctedSeconds = thousandthRound(correctedSeconds);
    }

    return (
        <div className="boat-entry results-boat-entry">
            <div className="vertical">
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
                </div>
                <div className="vertical-space"></div>
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
                </div>
            </div>
            <div className="vertial">
                <div className="vertical">
                    <div className="gray-text small-text">
                        Raw finish time:
                    </div>
                    <div className="green-text">
                        {days > 0 ? `${days} ${days > 1 ? "days" : "day"} + ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`}
                    </div>
                </div>
                <div className="vertical">
                    <div className="gray-text small-text">
                        Corrected time:
                    </div>
                    <div className="green-text">
                        {correctedTime ? (correctedDays > 0 ? `${correctedDays} ${correctedDays > 1 ? "days" : "day"} + ${formatTwoDigits(correctedHours)}:${formatTwoDigits(correctedMinutes)}:${formatTwoDigits(correctedSeconds)}` : `${formatTwoDigits(correctedHours)}:${formatTwoDigits(correctedMinutes)}:${formatTwoDigits(correctedSeconds)}`) : "-"}
                    </div>
                </div>
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