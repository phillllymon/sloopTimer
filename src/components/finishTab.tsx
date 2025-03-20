import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { RaceContext } from "./timerContainer";
import { FinishClassList } from "./finishClassList";
import { StagingArea } from "./stagingArea";

export const FinishTab: React.FC = () => {

    // TODO - start here adding the same time pinging thing as in startTab - then trickle it down to the lists and the staging area

    const raceContext = useContext(RaceContext);
    const [rando, setRando] = useState(Math.random());  // hack to force rerender - see setRando(Math.random()) in handleAddNewClass
    const [currentTime, setCurrentTime] = useState(raceContext.currentTime + (Date.now() - raceContext.lastUpdateTime));
    const [stagedBoats, setStagedBoats] = useState<number[][]>([]);
    
    const forceUpdate = () => {
        setRando(Math.random());
    };
    
    useEffect(() => {
        const pingInterval = setInterval(() => {
            setCurrentTime(raceContext.currentTime + (Date.now() - raceContext.lastUpdateTime));
        }, 1000);

        // returned function gets run when component unmounts - i.e. cleanup
        return () => {
            clearInterval(pingInterval);
        };
    }, []);

    const stageBoat = (raceIdx: number, classIdx: number, boatIdx: number): void => {
        const raceList = raceContext.raceList;
        raceList[raceIdx].classes[classIdx].boatList[boatIdx].staged = true;
        raceContext.setNewRaceList(raceList);
        const newStagedBoats = stagedBoats;
        newStagedBoats.push([raceIdx, classIdx, boatIdx]);
        setStagedBoats(newStagedBoats);
    };

    const unStageBoat = (raceIdx: number, classIdx: number, boatIdx: number): void => {
        const raceList = raceContext.raceList;
        raceList[raceIdx].classes[classIdx].boatList[boatIdx].staged = false;
        raceContext.setNewRaceList(raceList);
        let idx = -1;
        stagedBoats.forEach((boatArr, i) => {
            if (boatArr[0] === raceIdx && boatArr[1] === classIdx && boatArr[2] === boatIdx) {
                idx = i;
            }
        });
        if (idx > -1) {
            const before = stagedBoats.slice(0, idx);
            const after = stagedBoats.slice(idx + 1, stagedBoats.length);
            setStagedBoats(before.concat(after));
        }
    };

    return (
        <div className="page finish-page">
            <StagingArea 
                stagedBoats={stagedBoats}
                forceUpdate={forceUpdate}
                currentTime={currentTime}
                stageBoat={stageBoat}
                unStageBoat={unStageBoat} />
            <div className="scroll-section">
                {raceContext.raceIdx > -1 && raceContext.raceList[raceContext.raceIdx].classes.map((boatClass, i) => {
                    return (
                        <FinishClassList
                            raceIdx={raceContext.raceIdx}
                            classIdx={i}
                            forceUpdate={forceUpdate}
                            currentTime={currentTime}
                            stageBoat={stageBoat}
                            unStageBoat={unStageBoat}
                            key={i} />
                    )
                })}
            </div>
        </div>
    );
};