import React, { useState, useContext } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { UseCsvArea } from "./useCsvArea";

import type { BoatClass, Boat } from "./types";

type RaceListModalProps = {
    hideModal: () => void
}

export const RaceListModal: React.FC<RaceListModalProps> = (props: RaceListModalProps) => {
    const raceContext = useContext(RaceContext);

    const [newRaceAreaOpen, setNewRaceAreaOpen] = useState(false);
    const [uploadAreaOpen, setUploadAreaOpen] = useState(false);
    const [copyAreaOpen, setCopyAreaOpen] = useState(false);
    const [keepCheckedIn, setKeepCheckedIn] = useState(true);

    const [boatsArr, setBoatsArr] = useState<Record<string, string>[]>([]);
    const [nameError, setNameError] = useState("");

    const handleSelectRace = (idx: number): void => {
        raceContext.setRaceIdx(idx);
        props.hideModal();
    };

    const handleCopyRace = (idx: number): void => {
        const newRaceName = (document.getElementById("copy-race-name") as HTMLInputElement).value;
        if (newRaceName.length > 0) {
            const today = new Date(Date.now());
            const raceToCopy = raceContext.raceList[idx];
            const classes: BoatClass[] = [];
            const newRace = {
                name: newRaceName,
                startDay: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                },
                classes: classes
            };
            raceToCopy.classes.forEach((existingClass) => {
                const newBoatList: Boat[] = [];
                existingClass.boatList.forEach((existingBoat) => {
                    const newBoatStatus: Boat["status"] = keepCheckedIn ? (existingBoat.status === "signed up" ? "signed up" : "checked in") : "signed up";
                    const newBoatFinishTime: Boat["finishTime"] = false;
                    const newBoat: Boat = {
                        name: existingBoat.name,
                        sailNumber: existingBoat.sailNumber,
                        status: newBoatStatus,
                        finishTime: newBoatFinishTime,
                        staged: false,
                        boatType: existingBoat.boatType,
                        boatId: existingBoat.boatId
                    };
                    newBoatList.push(newBoat);
                });
                const newClass: BoatClass = {
                    raceName: newRaceName,
                    name: existingClass.name,
                    boatList: newBoatList,
                    startTime: {
                        hours: (today.getHours() + 1) % 24,
                        minutes: 0,
                        seconds: 0
                    },
                    cleared: false,
                    overEarly: []
                }
                newRace.classes.push(newClass);
            });
            const raceList = raceContext.raceList;
            raceList.push(newRace);
            raceContext.setNewRaceList(raceList);
            raceContext.setRaceIdx(raceContext.raceList.length - 1);
            props.hideModal();
        } else {
            setNameError("Enter race name");
        }
    };

    const handleCreateRace = () => {
        const newRaceName = (document.getElementById("new-race-name") as HTMLInputElement).value;
        if (newRaceName.length > 0) {
            const raceList = raceContext.raceList;
            const today = new Date(Date.now());
            let classes: BoatClass[] = [];
            if (boatsArr.length > 0) {
                classes = parseBoatsArrToClasses(boatsArr, newRaceName);
            }
            const newRace = {
                name: newRaceName,
                startDay: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                },
                classes: classes,
            };
            raceList.push(newRace);
            raceContext.setNewRaceList(raceList);
            raceContext.setRaceIdx(raceList.length - 1);
            props.hideModal();
        } else {
            setNameError("Enter race name");
        }
    };

    const setRaceInfo = (newBoatsArr: Record<string, string>[]): void => {
        setBoatsArr(newBoatsArr);
    };
    return (
        <>
            <div className="modal-screen" onClick={props.hideModal}></div>
            <div className="modal">
                {copyAreaOpen ? (
                    <>
                        <div className="vertical-space"></div>
                        <div className="vertical-space"></div>
                        <div className="vertical-space"></div>
                        <input
                            type="text"
                            id="copy-race-name"
                            className="new-boat-input new-race-input"
                            placeholder="enter race name">
                        </input>
                        <div className="small-text red-text">
                            {nameError}
                        </div>
                        <div className="vertical-space"></div>
                        <div className="small-text text-gray">
                            Select race to copy
                        </div>
                        <div className="class-list vertical-limit-size">
                            {raceContext.raceList.map((race, i) => {
                                let numBoats = 0;
                                let numClasses = 0;
                                race.classes.forEach((raceClass) => {
                                    numBoats += raceClass.boatList.length;
                                    numClasses += 1;
                                });
                                return (
                                    <div
                                        className="boat-entry"
                                        onClick={() => handleCopyRace(i)}
                                        key={i}>
                                        <div className="vertical">
                                            
                                            <div>
                                                {race.name}
                                            </div>
                                            <div className="small-text text-gray horizontal-left">
                                                <div>
                                                    classes: {numClasses}
                                                </div>
                                                <div className="space"></div>
                                                <div className="space"></div>
                                                <div className="space"></div>
                                                <div>
                                                    boats: {numBoats}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="vertical-space"></div>
                        <div className="vertical-space"></div>
                        <div className="vertical-space"></div>
                        <div className="horizontal-left">
                            <input
                                type="checkbox"
                                id="checked-in-checkbox"
                                className="check-checkbox"
                                checked={keepCheckedIn}
                                onChange={(e) => setKeepCheckedIn(e.target.checked)} />
                            <div className="space"></div>
                            <div className="small-text text-gray">
                                Keep boats checked in
                            </div>
                        </div>
                        <div className="vertical-space"></div>
                        <div className="vertical-space"></div>
                        <div className="vertical-space"></div>
                    </>
                ) : (
                    <>
                        {newRaceAreaOpen ? (
                            <>
                                <div className="vertical-space"></div>
                                <div className="vertical-space"></div>
                                <div className="vertical-space"></div>
                                <input
                                    type="text"
                                    id="new-race-name"
                                    className="new-boat-input new-race-input"
                                    placeholder="new race name">
                                </input>
                                <br/>
                                {uploadAreaOpen ? (
                                    <UseCsvArea
                                        setRaceInfo={setRaceInfo}
                                        nameError={nameError} />
                                ) : (
                                    <>
                                        <div className="blue-button" onClick={() => setUploadAreaOpen(true)}>
                                            Use .csv
                                        </div>
                                        <div className="small-text text-gray">
                                            (optional)
                                        </div>
                                    </>
                                )}
                                <br />
                                <div
                                    className="blue-button modal-list-button"
                                    onClick={handleCreateRace}>
                                    Create race
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="vertical-space"></div>
                                <div className="vertical-space"></div>
                                <div className="blue-button modal-list-button" onClick={() => setNewRaceAreaOpen(true)}>
                                    Add new race
                                </div>
                                <div className="blue-button modal-list-button" onClick={() => setCopyAreaOpen(true)}>
                                    Copy race
                                </div>
                                <div className="vertical-space"></div>
                                <div className="vertical-space"></div>
                                <div className="small-text text-gray">
                                    Select existing race
                                </div>
                                <div className="class-list vertical-limit-size">
                                    {raceContext.raceList.map((race, i) => {
                                        let numBoats = 0;
                                        let numClasses = 0;
                                        race.classes.forEach((raceClass) => {
                                            numBoats += raceClass.boatList.length;
                                            numClasses += 1;
                                        });
                                        return (
                                            <div
                                                className="boat-entry"
                                                onClick={() => handleSelectRace(i)}
                                                key={i}>
                                                <div className="vertical">
                                                    
                                                    <div>
                                                        {race.name}
                                                    </div>
                                                    <div className="small-text text-gray horizontal-left">
                                                        <div>
                                                            classes: {numClasses}
                                                        </div>
                                                        <div className="space"></div>
                                                        <div className="space"></div>
                                                        <div className="space"></div>
                                                        <div>
                                                            boats: {numBoats}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )}
                
            </div>
        </>
    );
};

function parseBoatsArrToClasses(boatsArr: Record<string, string>[], newRaceName: string): BoatClass[] {
    const classesObj: Record<string, BoatClass> = {};
    boatsArr.forEach((boatEntry) => {
        const className = boatEntry.boatClass;
        if (boatEntry.name && boatEntry.name.length > 0) {
            if (!classesObj[className]) {
                classesObj[className] = {
                    raceName: newRaceName,
                    name: className,
                    boatList: [],
                    startTime: {
                        hours: 12,
                        minutes: 0,
                        seconds: 0
                    },
                    cleared: false,
                    overEarly: []
                };
            }
            classesObj[className].boatList.push({
                name: boatEntry.name,
                sailNumber: boatEntry.sailNumber,
                boatType: boatEntry.boatType,
                phrf: Number.parseFloat(boatEntry.phrf),
                status: "signed up",
                finishTime: false,
                staged: false,
                boatId: boatEntry.boatId
            });
        }
    });
    return Object.keys(classesObj).map((className) => {
        return classesObj[className];
    });
}