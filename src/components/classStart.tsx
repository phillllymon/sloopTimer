import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { MiniStartTime } from "./miniStartTime";
import { Edit } from "./icons/edit";
import { SetStartTimeModal } from "./setStartTimeModal";
import { StartTimeDisplay } from "./startTimeDisplay";
import { StartClearTool } from "./startClearTool";

type ClassListProps = {
    raceIdx: number,
    classIdx: number,
    currentTime: number,
    forceUpdate: () => void
};

export const ClassStart: React.FC<ClassListProps> = (props: ClassListProps) => {
    const raceContext = useContext(RaceContext);
    if (!raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime) {
        raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime = {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
    const [setStartTimeModalOpen, setSetStartTimeModalOpen] = useState(false);
    const [startHours, setStartHours] = useState(startTime!.hours);
    const [startMinutes, setStartMinutes] = useState(startTime!.minutes);
    const [startSeconds, setStartSeconds] = useState(startTime!.seconds);

    const startDate = raceContext.raceList[props.raceIdx].startDay;
    const [startMonth, setStartMonth] = useState(startDate.month);
    const [startDay, setStartDay] = useState(startDate.day);
    const [startYear, setStartYear] = useState(startDate.year);

    const setMonth = (newMonth: number): void => {
        raceContext.raceList[props.raceIdx].startDay.month = newMonth;
        setStartMonth(newMonth);
    };
    const setDay = (newDay: number): void => {
        raceContext.raceList[props.raceIdx].startDay.day = newDay;
        setStartDay(newDay);
    };
    const setYear = (newYear: number): void => {
        raceContext.raceList[props.raceIdx].startDay.year = newYear;
        setStartYear(newYear);
    };

    const setHours = (newHours: number): void => {
        raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime!.hours = newHours;
        setStartHours(newHours);
    };
    const setMinutes = (newMinutes: number): void => {
        raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime!.minutes = newMinutes;
        setStartMinutes(newMinutes);
    };
    const setSeconds = (newSeconds: number): void => {
        raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime!.seconds = newSeconds;
        setStartSeconds(newSeconds);
    };
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    };
    
    
    return (
        <>
            {setStartTimeModalOpen && <SetStartTimeModal 
                hideModal={() => setSetStartTimeModalOpen(false)}
                raceIdx={props.raceIdx}
                classIdx={props.classIdx}
                setHours={setHours}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
                hours={startTime!.hours}
                minutes={startTime!.minutes}
                seconds={startTime!.seconds}
                setMonth={setMonth}
                setDay={setDay}
                setYear={setYear}
                month={startMonth}
                day={startDay}
                year={startYear}
                />}
            <div className="class-list">
                <div className="horizontal-between">
                    <div className="horizontal-left">
                        <div className="arrow-button" onClick={handleExpand}>
                            {expanded ? <DownArrow /> : <RightArrow />}
                        </div>
                        <div className="class-title">
                            {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].name}
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <MiniStartTime hours={startHours} minutes={startMinutes} seconds={startSeconds}/>
                        <div className="space"></div>
                        <div className="blue-button" onClick={() => setSetStartTimeModalOpen(true)}>
                            <Edit />
                        </div>
                    </div>
                </div>
                {expanded && <div className="vertical-center">
                    <StartTimeDisplay
                        raceIdx={props.raceIdx}
                        classIdx={props.classIdx}
                        currentTime={props.currentTime} />
                    <StartClearTool
                        raceIdx={props.raceIdx}
                        classIdx={props.classIdx}
                        currentTime={props.currentTime} />
                </div>}
            </div>
        </>
    );
};