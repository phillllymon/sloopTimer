import React, { useState, useContext } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { UploadInfoArea } from "./uploadInfoArea";

type RaceListModalProps = {
    hideModal: () => void
}

export const RaceListModal: React.FC<RaceListModalProps> = (props: RaceListModalProps) => {
    const raceContext = useContext(RaceContext);

    const [newRaceAreaOpen, setNewRaceAreaOpen] = useState(false);
    const [uploadAreaOpen, setUploadAreaOpen] = useState(false);
    const handleSelectRace = (idx: number): void => {
        raceContext.setRaceIdx(idx);
        props.hideModal();
    };

    const handleAddNewRace = () => {
        const newRaceName = (document.getElementById("new-race-name") as HTMLInputElement).value;
        if (newRaceName.length > 0) {
            const raceList = raceContext.raceList;
            const today = new Date(Date.now());
            const newRace = {
                name: newRaceName,
                startDay: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                },
                classes: [],
            };
            raceList.push(newRace);
            raceContext.setNewRaceList(raceList);
            raceContext.setRaceIdx(raceList.length - 1);
            props.hideModal();
        }
    };

    const setRaceInfo = (boatsArr: Record<string, string>[]): void => {
        console.log(boatsArr.length + " boats set");
        // TODO!!!!!
        // START HERE!!!!!!!
        // set the boatsArr here and then use it to determine what happens when "Create race" button is pushed
    }
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
                                setRaceInfo={setRaceInfo} />
                        ) : (
                            <div className="blue-button" onClick={() => setUploadAreaOpen(true)}>
                                Upload csv
                            </div>
                        )}
                        <div
                            className="blue-button modal-list-button"
                            onClick={() => console.log("create race")}>
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