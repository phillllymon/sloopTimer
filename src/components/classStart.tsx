import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { BoatEntry } from "./boatEntry";
import { MiniStartTime } from "./miniStartTime";
import { Edit } from "./icons/edit";
import { SetStartTimeModal } from "./setStartTimeModal";

type ClassListProps = {
    raceIdx: number,
    classIdx: number,
    forceUpdate: () => void
};

export const ClassStart: React.FC<ClassListProps> = (props: ClassListProps) => {
    const raceContext = useContext(RaceContext);
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
    const [setStartTimeModalOpen, setSetStartTimeModalOpen] = useState(false);
    const [startHours, setStartHours] = useState(startTime ? startTime.hours : false);
    const [startMinutes, setStartMinutes] = useState(startTime ? startTime.minutes : false);
    const [startSeconds, setStartSeconds] = useState(startTime ? startTime.seconds : false);
    const setHours = (newHours: number): void => {
        setStartHours(newHours);
    }
    const setMinutes = (newMinutes: number): void => {
        setStartMinutes(newMinutes);
    }
    const setSeconds = (newSeconds: number): void => {
        setStartSeconds(newSeconds);
    }
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    
    
    return (
        <>
            {setStartTimeModalOpen && <SetStartTimeModal 
                hideModal={() => setSetStartTimeModalOpen(false)}
                raceIdx={props.raceIdx}
                classIdx={props.classIdx}
                setHours={setHours}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
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
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return <BoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={props.classIdx}
                            boatIdx={i}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};