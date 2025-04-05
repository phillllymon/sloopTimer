import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { ResultsBoatEntry } from "./resultsBoatEntry";
import { SetLabelsModal } from "./setLabelsModal";
import { CsvModal } from "./csvModal";

type BoatKey = "name" | "sailNumber" | "phrf" | "boatType" | "boatId" | "finishTime";

type BoatObj = {
    name?: string,
    sailNumber?: string,
    class?: string,
    phrf?: string,
    boatType?: string,
    boatId?: string,
    finishTime?: string,
    courseTime?: string
};

type ResultsClassListProps = {
    raceIdx: number,
    classIdx: number,
    forceUpdate: () => void,
    rando: number
};

const niceNames: Record<string, string> = {
    "name": "Boat name",
    "sailNumber": "Sail number",
    "class": "Class",
    "phrf": "PHRF",
    "boatType": "Boat type",
    "boatId": "ID",
    "finishTime": "Finish time",
    "courseTime": "Course time"
};

export const ResultsClassList: React.FC<ResultsClassListProps> = (props: ResultsClassListProps) => {
    
    const [labelsModalOpen, setLabelsModalOpen] = useState(false);
    const [csvString, setCsvString] = useState("");
    const [csvModalOpen, setCsvModalOpen] = useState(false);
    const [labelsObj, setLabelsObj] = useState<Record<string, boolean>>({
        "name": true,
        "sailNumber": true,
        "class": true,
        "phrf": true,
        "boatType": true,
        "boatId": true,
        "finishTime": true,
        "courseTime": true
    });
    
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);
    const boats = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList;
    const numBoats = boats.length;
    let numFinished = 0;
    raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.forEach((boat) => {
        if (boat.finishTime) {
            numFinished += 1;
        }
    });

    const exportCsv = (): void => {
        const objArr: BoatObj[] = [];
        boats.forEach((boat) => {
            if (boat.finishTime) {
                const boatObj: Record<string, string> = {};
                Object.keys(labelsObj).forEach((key) => {
                    if (labelsObj[key]) {
                        if (key === "courseTime" && boat.finishTime) {
                            const startDate = raceContext.raceList[props.raceIdx].startDay;
                            const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
                            const startTimeDateObj = new Date(startDate.year, startDate.month - 1, startDate.day, startTime.hours, startTime.minutes, startTime.seconds);
                            const startTimeMs = startTimeDateObj.getTime();
                            const courseTimeMs = boat.finishTime - startTimeMs;
                            const courseTimeStr = makeCourseTimeStr(courseTimeMs);
                            boatObj[key] = courseTimeStr;
                        } else if (key === "class") {
                            boatObj[key] = raceContext.raceList[props.raceIdx].classes[props.classIdx].name;
                        } else if (boat[key as BoatKey]) {
                            boatObj[key] = boat[key as BoatKey]!.toString();
                        } else {
                            boatObj[key] = "";
                        }
                    }
                });
                objArr.push(boatObj);
            }
        });
        if (objArr.length > 0) {
            const headers = Object.keys(objArr[0]).map((oldName) => {
                const niceName = niceNames[oldName];
                if (niceName) {
                    return niceName;
                } else {
                    return oldName;
                }
            }).join(",");
            const rows = objArr.map((boatObj) => {
                return Object.values(boatObj).join(",");
            });
            const csvStr = `${headers}\n${rows.join("\r\n")}`;
            setCsvString(csvStr);
            setCsvModalOpen(true);
        }
    };
    
    return (
        <>
             {csvModalOpen && <CsvModal
                hideModal={() => setCsvModalOpen(false)}
                csvString={csvString} />}
            {labelsModalOpen && <SetLabelsModal
                hideModal={() => setLabelsModalOpen(false)}
                labelsObj={labelsObj}
                setLabelsObj={(s: Record<string, boolean>) => setLabelsObj(s)} />}
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
                    <div className="vertical">
                        <div>
                            {numFinished} / {numBoats}
                        </div>
                        <div className="gray-text small-text">
                            finished
                        </div>
                    </div>
                </div>
                {expanded && <div className="horizontal-between">
                    <div className="blue-button wide-button" onClick={() => setLabelsModalOpen(true)}>
                        Select data
                    </div>
                    <div className="blue-button wide-button" onClick={exportCsv}>
                        Export .csv
                    </div>    
                </div>}
                {expanded && <div>
                    {props.raceIdx > -1 && raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return <ResultsBoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={props.classIdx}
                            boatIdx={i}
                            labelsObj={labelsObj}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
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

function makeCourseTimeStr(ms: number): string {
    const days = Math.floor(ms / 86400000);
    const dayTime = ms % 86400000;
    const hours = Math.floor(dayTime / 3600000);
    const hourTime = dayTime % 3600000;
    const minutes = Math.floor(hourTime / 60000);
    const minuteTime = hourTime % 60000;
    const seconds = thousandthRound(minuteTime / 1000);
    const dayDisplay = days > 0 ? `${days} ${days > 1 ? "days" : "day"} + ` : "";
    return `${dayDisplay}${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${seconds}`;
};