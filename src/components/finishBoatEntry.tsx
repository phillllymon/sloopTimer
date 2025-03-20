import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import "./style/finishTab.css";
import { RaceContext } from "./timerContainer";
import { Edit } from "./icons/edit";
import { EditBoatModal } from "./editBoatModal";

type FinishBoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    currentTime: number
};

export const FinishBoatEntry: React.FC<FinishBoatEntryProps> = (props: FinishBoatEntryProps) => {
    const raceContext = useContext(RaceContext);
    const startDate = raceContext.raceList[props.raceIdx].startDay;
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
    const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
    const startTimeMs = startTimeDateObj.getTime();
    const raceStarted = props.currentTime > startTimeMs;

    const [boatFinished, setBoatFinished] = useState(raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status === "finished");

    const boatFinishTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime;

    const [seconds, setSeconds] = useState(boatFinishTime ? (boatFinishTime % 60000) / 1000 : 0);
    const [minutes, setMinutes] = useState(boatFinishTime ? Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000) - (Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000) : 0);
    const [hours, setHours] = useState(boatFinishTime ? Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000)) / 3600000) : 0);
    const [days, setDays] = useState(boatFinishTime ? Math.floor(boatFinishTime / 86400000) : 0);

    const [currentTimeUpdateTimestamp, setCurrentTimeUpdateTimestamp] = useState<false | number>(false);

    useEffect(() => {
        setCurrentTimeUpdateTimestamp(Date.now());
    }, [props.currentTime]);

    const finishBoat = () => {
        if (raceStarted) {
            const startDate = raceContext.raceList[props.raceIdx].startDay;
            const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
            const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
            const startTimeMs = startTimeDateObj.getTime();
            let boatTime = props.currentTime - startTimeMs;
            if (currentTimeUpdateTimestamp) {
                boatTime += (Date.now() - currentTimeUpdateTimestamp);
            }
            raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status = "finished";
            raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime = boatTime;
    
            setDays(Math.floor(boatTime / 86400000));
            setHours(Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000)) / 3600000));
            setMinutes(Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000) - (Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000));
            setSeconds((boatTime % 60000) / 1000);
            setBoatFinished(true);
        }
    };

    return (
        <div className="boat-entry finish-boat-entry">
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
            </div>
            <div>
                {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
            </div>
            {boatFinished ? (
                <div className="vertical">
                    <div className="gray-text small-text">
                        Finish time:
                    </div>
                    <div className="green-text">
                        {days > 0 ? `${days} ${days > 1 ? "days" : "day"} + ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`}
                    </div>
                </div>
            ) : (
                <div className={raceStarted ? "blue-button orange-button" : "blue-button orange-button inactive"} onClick={finishBoat}>
                    Finish
                </div>
            )}
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