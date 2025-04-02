import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import "./style/finishTab.css";
import { RaceContext } from "./timerContainer";
import { UpArrow } from "./icons/upArrow";
import { DownArrow } from "./icons/downArrow";
import { EditFinishModal } from "./editFinishModal";

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
    const finishDateObj = new Date(boatFinishTime);
    let seconds = finishDateObj.getSeconds();
    let minutes = finishDateObj.getMinutes();
    let hours = finishDateObj.getHours();

    let dateDisplay: string | false = false;
    const todayDateObj = new Date(Date.now());
    if (todayDateObj.getFullYear() !== finishDateObj.getFullYear() || todayDateObj.getDate() !== finishDateObj.getDate() || todayDateObj.getMonth() !== finishDateObj.getMonth()) {
        // dateDisplay = finishDateObj.toISOString().split("T")[0];
        dateDisplay = finishDateObj.toLocaleDateString();
    }

    const [currentTimeUpdateTimestamp, setCurrentTimeUpdateTimestamp] = useState<false | number>(false);
    const [editFinishModalOpen, setEditFinishModalOpen] = useState(false);

    useEffect(() => {
        setCurrentTimeUpdateTimestamp(Date.now());
    }, [props.currentTime]);

    const finishBoat = () => {
        if (raceStarted) {
            if (raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status === "finished") {
                const boatFinishTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime;
                if (boatFinishTime) {
                    const finishDateObj = new Date(boatFinishTime);
                    seconds = finishDateObj.getSeconds();
                    minutes = finishDateObj.getMinutes();
                    hours = finishDateObj.getHours();
                    const todayDateObj = new Date(Date.now());
                    if (todayDateObj.getFullYear() !== finishDateObj.getFullYear() || todayDateObj.getDate() !== finishDateObj.getDate() || todayDateObj.getMonth() !== finishDateObj.getMonth()) {
                        // dateDisplay = finishDateObj.toISOString().split("T")[0];
                        dateDisplay = finishDateObj.toLocaleDateString();
                    }

                    setBoatFinished(true);
                }
            } else {
                let boatFinishTime = props.currentTime;
                if (currentTimeUpdateTimestamp) {
                    boatFinishTime += (Date.now() - currentTimeUpdateTimestamp);
                }
                const raceList = raceContext.raceList;

                raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime = boatFinishTime;
                raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status = "finished";
                if (!raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes) {
                    raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes = [];
                }
                raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes!.push(boatFinishTime);
                if (raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes!.length > 5) {
                    raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes!.shift();
                }
                raceContext.setNewRaceList(raceList);

                const finishDateObj = new Date(boatFinishTime);
                seconds = finishDateObj.getSeconds();
                minutes = finishDateObj.getMinutes();
                hours = finishDateObj.getHours();
                const todayDateObj = new Date(Date.now());
                if (todayDateObj.getFullYear() !== finishDateObj.getFullYear() || todayDateObj.getDate() !== finishDateObj.getDate() || todayDateObj.getMonth() !== finishDateObj.getMonth()) {
                    // dateDisplay = finishDateObj.toISOString().split("T")[0];
                    dateDisplay = finishDateObj.toLocaleDateString();
                }

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

    const editFinish = (): void => {
        setEditFinishModalOpen(true);
    };

    if (props.staged) {
        return (
            <div className="boat-entry finish-boat-entry stage-boat-entry" onClick={finishBoat}>
                {editFinishModalOpen && <EditFinishModal
                    hideModal={() => setEditFinishModalOpen(false)}
                    raceIdx={props.raceIdx}
                    classIdx={props.classIdx}
                    boatIdx={props.boatIdx}
                    forceUpdate={props.forceUpdate} />}
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
                            {dateDisplay ? `${dateDisplay} - ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                {props.finished && <div className={raceStarted ? "blue-button orange-button" : "blue-button orange-button inactive"} onClick={editFinish}>
                    Edit
                </div>}
                <div className="horizontal-right">
                    <div className="arrow-button background-red" onClick={unStageBoat}>
                        X
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="boat-entry finish-boat-entry">
            {editFinishModalOpen && <EditFinishModal
                hideModal={() => setEditFinishModalOpen(false)}
                raceIdx={props.raceIdx}
                classIdx={props.classIdx}
                boatIdx={props.boatIdx}
                forceUpdate={props.forceUpdate} />}
            <div className="vertical-left">
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
                </div>
                <div className="vertical-space"></div>
                <div className="text-gray">
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].boatType}
                </div>
            </div>
            <div className="vertical-center">
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
                </div>
                {props.finished ? (
                    <div className="green-text">
                        {dateDisplay ? `${dateDisplay} - ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}` : `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`}
                    </div>
                ) : (
                    <div>
                        {""}
                    </div>
                )}
            </div>
            <div className="horizontal-right">
                {!props.finished && (
                    (
                        <div>
                            {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].staged ? (
                                <div className={raceStarted ? "blue-button" : "blue-button inactive"} onClick={unStageBoat}>
                                    Unstage
                                </div>
                            ) : (
                                <div className={raceStarted ? "blue-button" : "blue-button inactive"} onClick={stageBoat}>
                                    Stage
                                </div>
                            )}
                        </div>
                    )
                )}
                {props.finished ? (
                    <div className={raceStarted ? "blue-button orange-button" : "blue-button orange-button inactive"} onClick={editFinish}>
                        Edit
                    </div>
                ) : (
                    <div className={raceStarted ? "blue-button orange-button" : "blue-button orange-button inactive"} onClick={finishBoat}>
                        Finish
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