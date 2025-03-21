import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import "./style/finishTab.css";
import { RaceContext } from "./timerContainer";
import { UpArrow } from "./icons/upArrow";
import { DownArrow } from "./icons/downArrow";

type FinishBoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    stageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    unStageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    currentTime: number,
    rando: number,
    forceUpdate: () => void,
    finished: boolean,
    finishTime: number,
    staged?: boolean
};

export const FinishBoatEntry: React.FC<FinishBoatEntryProps> = (props: FinishBoatEntryProps) => {
    const raceContext = useContext(RaceContext);
    const startDate = raceContext.raceList[props.raceIdx].startDay;
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
    const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
    const startTimeMs = startTimeDateObj.getTime();
    const raceStarted = props.currentTime > startTimeMs;

    const [boatFinished, setBoatFinished] = useState(raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status === "finished");

    const boatFinishTime = props.finishTime;

    let seconds = boatFinishTime ? (boatFinishTime % 60000) / 1000 : 0;
    let minutes = boatFinishTime ? Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000) - (Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000) : 0;
    let hours = boatFinishTime ? Math.floor((boatFinishTime - (Math.floor(boatFinishTime / 86400000) * 86400000)) / 3600000) : 0;
    let days = boatFinishTime ? Math.floor(boatFinishTime / 86400000) : 0;

    const [currentTimeUpdateTimestamp, setCurrentTimeUpdateTimestamp] = useState<false | number>(false);

    useEffect(() => {
        setCurrentTimeUpdateTimestamp(Date.now());
    }, [props.currentTime]);

    const finishBoat = () => {
        if (raceStarted) {
            if (raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status === "finished") {
                const boatTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime;
                if (boatTime) {

                    seconds = boatTime ? (boatTime % 60000) / 1000 : 0;
                    minutes = boatTime ? Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000) - (Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000) : 0;
                    hours = boatTime ? Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000)) / 3600000) : 0;
                    days = boatTime ? Math.floor(boatTime / 86400000) : 0;
                    setBoatFinished(true);
                }
            } else {
                const startDate = raceContext.raceList[props.raceIdx].startDay;
                const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
                const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
                const startTimeMs = startTimeDateObj.getTime();
                let boatTime = props.currentTime - startTimeMs;
                if (currentTimeUpdateTimestamp) {
                    boatTime += (Date.now() - currentTimeUpdateTimestamp);
                }
                const raceList = raceContext.raceList;

                raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime = boatTime;
                raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status = "finished";
                raceContext.setNewRaceList(raceList);

                seconds = boatTime ? (boatTime % 60000) / 1000 : 0;
                minutes = boatTime ? Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000) - (Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000) : 0;
                hours = boatTime ? Math.floor((boatTime - (Math.floor(boatTime / 86400000) * 86400000)) / 3600000) : 0;
                days = boatTime ? Math.floor(boatTime / 86400000) : 0;
                setBoatFinished(true);
            }
        }
        props.forceUpdate();
    };

    const stageBoat = () => {
        if (raceStarted) {
            props.stageBoat(props.raceIdx, props.classIdx, props.boatIdx);
        }
    };

    const unStageBoat = (e: any) => {
        e.stopPropagation();
        if (raceStarted) {
            props.unStageBoat(props.raceIdx, props.classIdx, props.boatIdx);
        }
    };

    const moveUp = (e: any) => {
        e.stopPropagation();
        let idx = -1;
        const stageList = raceContext.stagedBoats;
        stageList.forEach((entryArr, i) => {
            if (entryArr[0] === props.raceIdx && entryArr[1] === props.classIdx && entryArr[2] === props.boatIdx) {
                idx = i;
            }
        });
        if (idx > 0) {
            const before = stageList.slice(0, idx);
            const after = stageList.slice(idx + 1, stageList.length);
            const newAfter = [before.pop()!].concat(after);
            before.push(stageList[idx]);
            const newStageList = before.concat(newAfter);
            raceContext.setStagedBoats(newStageList);
        }
    };

    const moveDown = (e: any) => {
        e.stopPropagation();
        let idx = -1;
        const stageList = raceContext.stagedBoats;
        stageList.forEach((entryArr, i) => {
            if (entryArr[0] === props.raceIdx && entryArr[1] === props.classIdx && entryArr[2] === props.boatIdx) {
                idx = i;
            }
        });
        if (idx > -1 && idx < stageList.length - 1) {
            const before = stageList.slice(0, idx);
            const after = stageList.slice(idx + 1, stageList.length);
            const newBefore = before.concat([after.shift()!]);
            newBefore.push(stageList[idx]);
            const newStageList = newBefore.concat(after);
            raceContext.setStagedBoats(newStageList);
        }
    };

    if (props.staged) {
        return (
            <div className="boat-entry finish-boat-entry stage-boat-entry" onClick={finishBoat}>
                <div className="horizontal-left">
                    <div className="vertical arrow-button">
                        <div onClick={moveUp}>
                            <UpArrow />
                        </div>
                        <div className="vertical-space"></div>
                        <div onClick={moveDown}>
                            <DownArrow />
                        </div>
                    </div>
                    <div className="space"></div>
                    <div className="vertical">
        
                        <div>
                            {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
                        </div>
                        <div className="vertical-space"></div>
                        <div>
                            {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
                        </div>
                    </div>
                </div>
                {props.finished ? (
                    <div className="vertical">
                        <div className="gray-text small-text">
                            Finish time:
                        </div>
                        <div className="green-text">
                            {days > 0 ? `${days} ${days > 1 ? "days" : "day"} + ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="horizontal-right">
                    <div className={raceStarted ? "blue-button" : "blue-button inactive"} onClick={unStageBoat}>
                        Unstage
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="boat-entry finish-boat-entry">
            <div className="vertical">
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
                </div>
                <div className="vertical-space"></div>
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
                </div>
            </div>
            {props.finished ? (
                <div className="vertical">
                    <div className="gray-text small-text">
                        Finish time:
                    </div>
                    <div className="green-text">
                        {days > 0 ? `${days} ${days > 1 ? "days" : "day"} + ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`}
                    </div>
                </div>
            ) : (
                <div className="horizontal-right">
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].staged ? (
                        <div className={raceStarted ? "blue-button" : "blue-button inactive"} onClick={unStageBoat}>
                            Unstage
                        </div>
                    ) : (
                        <div className={raceStarted ? "blue-button" : "blue-button inactive"} onClick={stageBoat}>
                            Stage
                        </div>
                    )}
                    <div className={raceStarted ? "blue-button orange-button" : "blue-button orange-button inactive"} onClick={finishBoat}>
                        Finish
                    </div>
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