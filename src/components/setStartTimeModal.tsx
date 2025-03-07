import React, { useContext, useState } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { UpArrow } from "./icons/upArrow";
import { DownArrow } from "./icons/downArrow";

type SetStartTimeModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number,
    setHours: (n: number) => void,
    setMinutes: (n: number) => void,
    setSeconds: (n: number) => void
}

export const SetStartTimeModal: React.FC<SetStartTimeModalProps> = (props: SetStartTimeModalProps) => {
    const raceContext = useContext(RaceContext);
    const raceClass = raceContext.raceList[props.raceIdx].classes[props.classIdx].name;
    const startTime = raceContext.raceList[props.raceIdx].classes[props.classIdx].startTime;
    if (!startTime) {
        props.setHours(0);
        props.setMinutes(0);
        props.setSeconds(0);
    } 
    return (
        <>
            <div className="modal-screen" onClick={props.hideModal}></div>
            <div className="modal new-boat-modal">
                <div className="vertical-space"></div>
                {raceClass}
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="horizontal-left">
                    <div>
                        Start:
                    </div>
                    <div className="space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button">
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="large-digit-box">
                                1
                            </div>
                            <div className="mini-space"></div>
                            <div className="large-digit-box">
                                1
                            </div>
                        </div>
                        <div className="blue-button wide-button">
                            <DownArrow />
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div>:</div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button">
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="large-digit-box">
                                1
                            </div>
                            <div className="mini-space"></div>
                            <div className="large-digit-box">
                                1
                            </div>
                        </div>
                        <div className="blue-button wide-button">
                            <DownArrow />
                        </div>
                    </div>
                    <div className="mini-space"></div>
                    <div>:</div>
                    <div className="mini-space"></div>
                    <div className="vertical-center">
                        <div className="blue-button wide-button">
                            <UpArrow />
                        </div>
                        <div className="horizontal-center">
                            <div className="large-digit-box">
                                1
                            </div>
                            <div className="mini-space"></div>
                            <div className="large-digit-box">
                                1
                            </div>
                        </div>
                        <div className="blue-button wide-button">
                            <DownArrow />
                        </div>
                    </div>
                </div>
                <div className="vertical-space"></div>
                <div className="vertical-space"></div>
                <div className="blue-button" onClick={props.hideModal}>
                    Done
                </div>
            </div>
        </>
    );
};