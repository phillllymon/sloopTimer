import React, { useState, useContext } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { ClassList } from "./classList";

export const BoatsTab: React.FC = () => {
    const raceContext = useContext(RaceContext);
    const [rando, setRando] = useState(Math.random());  // hack to force rerender - see setRando(Math.random()) in handleAddNewClass
    const forceUpdate = () => {
        setRando(Math.random());
    };
    const handleAddNewClass = () => {
        const newClassName = (document.getElementById("new-class-name") as HTMLInputElement).value;
        if (newClassName.length > 0) {
            const raceList = raceContext.raceList;
            raceList[raceContext.raceIdx].classes.push({
                raceName: raceList[raceContext.raceIdx].name,
                name: newClassName,
                boatList: [],
                cleared: false,
                overEarly: []
            });
            raceContext.setNewRaceList(raceList);
            setRando(Math.random());    // force rerender - see above
            (document.getElementById("new-class-name") as HTMLInputElement).value = "";
        }
    };
    
    return (
        <div className="page">
            {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                return (
                    <ClassList
                        raceIdx={raceContext.raceIdx}
                        classIdx={i}
                        forceUpdate={forceUpdate}
                        key={i} />
                )
            })}
            {raceContext.raceIdx > -1 && <div className="class-list">
                <div className="horizontal-between">
                    <input
                        type="text"
                        className="class-name-input"
                        placeholder="add class"
                        id="new-class-name">
                    </input>
                    <div
                        className="blue-button class-add-button"
                        onClick={handleAddNewClass}
                        >
                        +
                    </div>
                </div>
            </div>}
        </div>
    );
};