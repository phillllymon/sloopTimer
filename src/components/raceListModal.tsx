import React, { useState, useContext } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { UploadInfoArea } from "./uploadInfoArea";

import type { BoatClass } from "./types";

type RaceListModalProps = {
    hideModal: () => void
}

export const RaceListModal: React.FC<RaceListModalProps> = (props: RaceListModalProps) => {
    const raceContext = useContext(RaceContext);

    const [newRaceAreaOpen, setNewRaceAreaOpen] = useState(false);
    const [uploadAreaOpen, setUploadAreaOpen] = useState(false);

    const [boatsArr, setBoatsArr] = useState<Record<string, string>[]>([]);
    const [nameError, setNameError] = useState("");

    const handleSelectRace = (idx: number): void => {
        raceContext.setRaceIdx(idx);
        props.hideModal();
    };

    const handleCreateRace = () => {
        const newRaceName = (document.getElementById("new-race-name") as HTMLInputElement).value;
        if (newRaceName.length > 0) {
            const raceList = raceContext.raceList;
            const today = new Date(Date.now());
            let classes: BoatClass[] = [];
            if (boatsArr.length > 0) {
                classes = parseBoatsArrToClasses(boatsArr, newRaceName);
                console.log(classes);
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
                {newRaceAreaOpen ? (
                    <>
                        New race
                        <input
                            type="text"
                            id="new-race-name"
                            className="new-boat-input new-race-input"
                            placeholder="enter race name">
                        </input>
                        <br/>
                        {uploadAreaOpen ? (
                            <UploadInfoArea
                                setRaceInfo={setRaceInfo}
                                nameError={nameError} />
                        ) : (
                            <div className="blue-button" onClick={() => setUploadAreaOpen(true)}>
                                Upload csv
                            </div>
                        )}
                        <div
                            className="blue-button modal-list-button"
                            onClick={handleCreateRace}>
                            Create race
                        </div>
                    </>
                ) : (
                    <>
                        <br />
                        <div className="blue-button modal-list-button" onClick={() => setNewRaceAreaOpen(true)}>
                            + New race
                        </div>
                        races:
                        {raceContext.raceList.map((race, i) => {
                            return (
                                <div
                                    className="blue-button modal-list-button"
                                    onClick={() => handleSelectRace(i)}
                                    key={i}>
                                    {race.name}
                                </div>
                            );
                        })}
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
                status: "signedUp",
                finishTime: false,
                staged: false
            });
        }
    });
    return Object.keys(classesObj).map((className) => {
        return classesObj[className];
    });
}