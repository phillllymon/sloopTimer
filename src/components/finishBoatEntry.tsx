import React, { useContext, useState } from "react";
import "./style.css";
import "./style/finishTab.css";
import { RaceContext } from "./timerContainer";
import { Edit } from "./icons/edit";
import { EditBoatModal } from "./editBoatModal";

type FinishBoatEntryProps = {
    raceIdx: number,
    classIdx: number,
    boatIdx: number
};

export const FinishBoatEntry: React.FC<FinishBoatEntryProps> = (props: FinishBoatEntryProps) => {
    const [editBoatModalOpen, setEditBoatModalOpen] = useState(false);
    const raceContext = useContext(RaceContext);
    return (
        <>
            {editBoatModalOpen && <EditBoatModal 
            hideModal={() => setEditBoatModalOpen(false)}
            raceIdx={props.raceIdx}
            classIdx={props.classIdx}
            boatIdx={props.boatIdx}/>}
            <div className="boat-entry">
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].name}
                </div>
                <div>
                    {raceContext.raceList[props.raceIdx].classes[props.classIdx].boatList[props.boatIdx].sailNumber}
                </div>
                <div className="blue-button orange-button" onClick={() => console.log("finish")}>
                    Finish
                </div>
            </div>
        </>
    );
};