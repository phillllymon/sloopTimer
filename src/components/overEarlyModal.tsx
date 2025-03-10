import React, { useContext, useState } from "react";
import "./style.css";
import "./style/modal.css";
import { RaceContext } from "./timerContainer";
import { BoatSelectEntry } from "./boatSelectEntry";

type OverEarlyModalProps = {
    hideModal: () => void,
    raceIdx: number,
    classIdx: number
}

export const OverEarlyModal: React.FC<OverEarlyModalProps> = (props: OverEarlyModalProps) => {
    const raceContext = useContext(RaceContext);
    const handleSelect = () => {
        console.log("poop");
    }

    return (
        <>
            <div className="modal-screen" onClick={props.hideModal}></div>
            <div className="modal">
                <div className="vertical-space"></div>
                Select over early boats
                <div className="vertical-space"></div>
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList.map((boat, i) => {
                        return (
                            <div key={i}>
                                <BoatSelectEntry
                                    raceIdx={props.raceIdx}
                                    classIdx={props.classIdx}
                                    boatIdx={i}
                                    onSelect={handleSelect} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};