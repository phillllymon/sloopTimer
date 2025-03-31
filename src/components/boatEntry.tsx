import React, { useContext, useState } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { Edit } from "./icons/edit";
import { EditBoatModal } from "./editBoatModal";

type BoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number,
    rando: number,
    forceUpdate: () => void
};

export const BoatEntry: React.FC<BoatEntryProps> = (props: BoatEntryProps) => {
    const [editBoatModalOpen, setEditBoatModalOpen] = useState(false);
    const raceContext = useContext(RaceContext);
    const boat = raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx];
    const checkBoatIn = () => {
        const raceList = raceContext.raceList;
        raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].status = "checked in";
        raceContext.setNewRaceList(raceList);
        props.forceUpdate();
    };
    return (
        <>
            {editBoatModalOpen && <EditBoatModal 
            hideModal={() => setEditBoatModalOpen(false)}
            raceIdx={props.raceIdx}
            classIdx={props.classIdx}
            boatIdx={props.boatIdx}/>}
            <div className="boat-entry">
                <div className="horizontal-left">
                    <div onClick={() => setEditBoatModalOpen(true)}>
                        <Edit />
                    </div>
                    <div className="space"></div>
                    <div className="space"></div>
                    <div className="vertical-left">
                        <div>
                            {boat.name}
                        </div>
                        <div className="vertical-space"></div>
                        <div className="text-gray">
                            {boat.boatType}
                        </div>
                    </div>
                </div>
                <div>
                    {boat.sailNumber}
                </div>
                {boat.status === "signed up" ? (
                    <div className="blue-button" onClick={checkBoatIn}>
                        Check in
                    </div>
                ) : (
                    <div>
                        {boat.status}
                    </div>
                )}
            </div>
        </>
    );
};