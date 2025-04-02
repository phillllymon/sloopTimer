import React, { useContext, useState } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { UpArrow } from "./icons/upArrow";
import { DownArrow } from "./icons/downArrow";
import { Edit } from "./icons/edit";

type EditFinishModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    forceUpdate: () => void
}

// note: this is different than in the <SetStartTimeModal>
const monthNames: Record<number, string> = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

const monthLengths: Record<number, number> ={
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

function getMonthLength(month: number, year: number): number {
    if (month === 2 && year % 4 === 0) {
        return 29;
    } else {
        return monthLengths[month];
    }
}

export const EditFinishModal: React.FC<EditFinishModalProps> = (props: EditFinishModalProps) => {
    const raceContext = useContext(RaceContext);
    const boat = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx];
    const boatFinishTime = boat.finishTime;
    
    const [expanded, setExpanded] = useState(false);
    
    const finishDateObj = new Date(boatFinishTime ? boatFinishTime : Date.now());
    const [seconds, setSeconds] = useState(finishDateObj.getSeconds() + (finishDateObj.getMilliseconds() / 1000));
    const [minutes, setMinutes] = useState(finishDateObj.getMinutes());
    const [hours, setHours] = useState(finishDateObj.getHours());

    const [day, setDay] = useState(finishDateObj.getDate());
    const [month, setMonth] = useState(finishDateObj.getMonth());
    const [year, setYear] = useState(finishDateObj.getFullYear());

    const lowerMonth = () => {
        if (month === 0) {
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };
    const raiseMonth = () => {
        if (month === 11) {
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };
    const lowerDay = () => {
        const monthLength = getMonthLength(month, year);
        if (day === 1) {
            setDay(monthLength);
        } else {
            setDay(day - 1);
        }
    };
    const raiseDay = () => {
        const monthLength = getMonthLength(month, year);
        if (day === monthLength) {
            setDay(1);
        } else {
            setDay(day + 1);
        }
    };
    const lowerYear = () => {
        setYear(year - 1);
    };
    const raiseYear = () => {
        setYear(year + 1);
    };

    const setNewHours = (e: any): void => {
        setHours(e.target.value);
    }
    const setNewMinutes = (e: any): void => {
        setMinutes(e.target.value);
    }
    const setNewSeconds = (e: any): void => {
        setSeconds(e.target.value);
    }

    const finishAndClose = (): void => {
        const newDateObj = new Date(year, month, day, hours, minutes, seconds);
        const extraMs = Math.floor(1000 * (seconds - Math.floor(seconds)));
        const correctedDateObj = new Date(newDateObj.getTime() + extraMs);
        const raceList = raceContext.raceList;
        const timestampMs = correctedDateObj.getTime();
        if (!raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes) {
            raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes = [];
        }
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].listedFinishTimes!.push(timestampMs);
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime = timestampMs;
        raceContext.setNewRaceList(raceList);
        props.hideModal();
    };

    const selectTimestampAndClose = (timestampMs: number): void => {
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime = timestampMs;
        raceContext.setNewRaceList(raceList);
        props.hideModal();
    };

    const unfinishBoat = (e: any): void => {
        e.stopPropagation();
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].finishTime = false;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status = "racing";
        raceContext.setNewRaceList(raceList);
        props.forceUpdate();
        props.hideModal();
    };

    return (
        <>
            <div className="modal-screen" onClick={finishAndClose}></div>
            <div className="modal new-boat-modal">
                <div className="vertical-space"></div>
                {boat.name}
                <div className="vertical-space"></div>
                <div className="text-small gray-text">
                    Directly edit finish time:
                </div>
                <div className="vertical-space"></div>
                <div className="horizontal-center">
                    <input
                        className="edit-time-input"
                        type="text"
                        value={hours}
                        onChange={setNewHours} />
                    <div>:</div>
                    <input
                        className="edit-time-input"
                        type="text"
                        value={minutes}
                        onChange={setNewMinutes} />
                    <div>:</div>
                    <input
                        className="edit-time-input edit-seconds-input"
                        type="text"
                        value={seconds}
                        onChange={setNewSeconds} />
                </div>
                
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="horizontal-center">
                    <div>
                        {`${monthNames[month]} ${day}, ${year}`}
                    </div>
                    <div className="space"></div>
                    <div className="space"></div>
                    <div className="space"></div>
                    <div className="space"></div>
                    <div className="space"></div>
                    <div className="space"></div>
                    <div onClick={() => setExpanded(expanded ? false : true)}>
                        <Edit />
                    </div>
                    <div className="space"></div>
                    <div className="space"></div>
                </div>
                {expanded && 
                <div className="horizontal-left">
                    <div className="vertical-center">
                        <div className="blue-button wide-button" onClick={raiseMonth}>
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="value-box">
                                {monthNames[month]}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerMonth}>
                            <DownArrow />
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div className="space"></div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button" onClick={raiseDay}>
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="value-box">
                                {day}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerDay}>
                            <DownArrow />
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div className="space"></div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button" onClick={raiseYear}>
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="value-box">
                                {year}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerYear}>
                            <DownArrow />
                        </div>
                    </div>
                </div>}
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="text-small gray-text">
                    Select previously recorded time:
                </div>
                <div className="vertical-space"></div>
                {boat.listedFinishTimes && boat.listedFinishTimes.map((listedTime, i) => {
                    return (
                        <div className="blue-button wide-button" onClick={() => selectTimestampAndClose(listedTime)} key={i}>
                            {formatTime(listedTime)}
                        </div>
                    );
                })}
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="horizontal-around">
                    <div className="blue-button selected-button" onClick={unfinishBoat}>
                        Unfinish
                    </div>
                    <div className="blue-button" onClick={finishAndClose}>
                        Done
                    </div>
                </div>
            </div>
        </>
    );
};

function formatTime(n: number): string {
    const dateObj = new Date(n);
    return `${dateObj.toLocaleDateString()} ${formatTwoDigits(dateObj.getHours())}:${formatTwoDigits(dateObj.getMinutes())}:${formatTwoDigits(dateObj.getSeconds())}`;
}

function formatTwoDigits(n: number): string {
    if (n < 10) {
        return `0${n}`;
    } else {
        return `${n}`;
    }
}