import React, { useContext, useState } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { UpArrow } from "./icons/upArrow";
import { DownArrow } from "./icons/downArrow";
import { Edit } from "./icons/edit";

type SetStartTimeModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number,
    setHours: (n: number) => void,
    setMinutes: (n: number) => void,
    setSeconds: (n: number) => void,
    hours: number,
    minutes: number,
    seconds: number,
    setMonth: (n: number) => void,
    setDay: (n: number) => void,
    setYear: (n: number) => void,
    month: number,
    day: number,
    year: number
}

const monthNames: Record<number, string> = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
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

export const SetStartTimeModal: React.FC<SetStartTimeModalProps> = (props: SetStartTimeModalProps) => {
    const [expanded, setExpanded] = useState(false);
    const raceContext = useContext(RaceContext);
    const raceClass = raceContext.raceList[props.raceIdx].classes[props.classIdx].name;
    const hoursA = (Math.floor(props.hours / 10)).toString();
    const hoursB = (props.hours % 10).toString();
    const minutesA = (Math.floor(props.minutes / 10)).toString();
    const minutesB = (props.minutes % 10).toString();
    const secondsA = (Math.floor(props.seconds / 10)).toString();
    const secondsB = (props.seconds % 10).toString();
    const raiseHours = () => {
        if (props.hours === 23) {
            props.setHours(0);
        } else {
            props.setHours(props.hours + 1);
        }
    };
    const lowerHours = () => {
        if (props.hours === 0) {
            props.setHours(23);
        } else {
            props.setHours(props.hours - 1);
        }
    };
    const raiseMinutes = () => {
        if (props.minutes === 59) {
            props.setMinutes(0);
        } else {
            props.setMinutes(props.minutes + 1);
        }
    };
    const lowerMinutes = () => {
        if (props.minutes === 0) {
            props.setMinutes(59);
        } else {
            props.setMinutes(props.minutes - 1);
        }
    };
    const raiseSeconds = () => {
        if (props.seconds === 59) {
            props.setSeconds(0);
        } else {
            props.setSeconds(props.seconds + 1);
        }
    };
    const lowerSeconds = () => {
        if (props.seconds === 0) {
            props.setSeconds(59);
        } else {
            props.setSeconds(props.seconds - 1);
        }
    };

    const lowerMonth = () => {
        if (props.month === 1) {
            props.setMonth(12);
        } else {
            props.setMonth(props.month - 1);
        }
    };
    const raiseMonth = () => {
        if (props.month === 12) {
            props.setMonth(1);
        } else {
            props.setMonth(props.month + 1);
        }
    };
    const lowerDay = () => {
        const monthLength = getMonthLength(props.month, props.year);
        if (props.day === 1) {
            props.setDay(monthLength);
        } else {
            props.setDay(props.day - 1);
        }
    };
    const raiseDay = () => {
        const monthLength = getMonthLength(props.month, props.year);
        if (props.day === monthLength) {
            props.setDay(1);
        } else {
            props.setDay(props.day + 1);
        }
    };
    const lowerYear = () => {
        props.setYear(props.year - 1);
    };
    const raiseYear = () => {
        props.setYear(props.year + 1);
    };

    return (
        <>
            <div className="modal-screen" onClick={props.hideModal}></div>
            <div className="modal new-boat-modal">
                <div className="vertical-space"></div>
                {raceClass}
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="horizontal-left">
                    <div className="vertical-center">
                        <div className="blue-button wide-button" onClick={raiseHours}>
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="digit-box">
                                {hoursA}
                            </div>
                            <div className="mini-space"></div>
                            <div className="digit-box">
                                {hoursB}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerHours}>
                            <DownArrow />
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div>:</div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button" onClick={raiseMinutes}>
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="digit-box">
                                {minutesA}
                            </div>
                            <div className="mini-space"></div>
                            <div className="digit-box">
                                {minutesB}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerMinutes}>
                            <DownArrow />
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div>:</div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button" onClick={raiseSeconds}>
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="digit-box">
                                {secondsA}
                            </div>
                            <div className="mini-space"></div>
                            <div className="digit-box">
                                {secondsB}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerSeconds}>
                            <DownArrow />
                        </div>
                    </div>
                </div>
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="horizontal-center">
                    <div>
                        {`${monthNames[props.month]} ${props.day}, ${props.year}`}
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
                                {monthNames[props.month]}
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
                                {props.day}
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
                                {props.year}
                            </div>
                        </div>
                        <div className="blue-button wide-button" onClick={lowerYear}>
                            <DownArrow />
                        </div>
                    </div>
                </div>}
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="blue-button" onClick={props.hideModal}>
                    Done
                </div>
            </div>
        </>
    );
};