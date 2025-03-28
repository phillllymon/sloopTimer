import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { FinishBoatEntry } from "./finishBoatEntry";
import { SearchBar } from "./searchBar";
import type { Boat } from "./types";

type FinishAllBoatsProps = {
    raceIdx: number,
    currentTime: number,
    stageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    unStageBoat: (raceIdx: number, classIdx: number, boatIdx: number) => void,
    forceUpdate: () => void,
    rando: number
};

export const FinishAllBoats: React.FC<FinishAllBoatsProps> = (props: FinishAllBoatsProps) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [boats, setBoats] = useState<Boat[]>([]);

    const getAllBoats = (): Boat[] => {
        if (props.raceIdx > -1) {
            const allBoats: Boat[] = [];
            raceContext.raceList[props.raceIdx].classes.forEach((raceClass, classIdx) => {
                raceClass.boatList.forEach((boat, boatIdx) => {
                    boat.classIdx = classIdx;
                    boat.boatIdx = boatIdx;
                    allBoats.push(boat);
                });
            });
            return allBoats;
        } else {
            return [];
        }
    };

    const setAllBoats = (): void => {
        if (props.raceIdx > -1) {
            const allBoats = getAllBoats();
            allBoats.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else {
                    return -1;
                }
            });
            setBoats(allBoats);
        }
    };

    const filterBoats = (): void => {
        const allBoats = getAllBoats();
        const filteredBoats: Boat[] = [];
        allBoats.forEach((boat) => {
            if (boat.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                filteredBoats.push(boat);
            }
        });
        filteredBoats.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        });
        setBoats(filteredBoats);
    };

    useEffect(filterBoats, [searchTerm]);
    useEffect(setAllBoats, [props.raceIdx]);
    
    
    return (
        <>
            <div className="class-list">
                <div className="horizontal-between">
                    <div className="horizontal-left">
                        <div className="arrow-button" onClick={handleExpand}>
                            {expanded ? <DownArrow /> : <RightArrow />}
                        </div>
                        <div className="class-title">
                            All boats
                        </div>
                    </div>
                    <SearchBar
                        placeholderText="search"
                        setSearchTerm={setSearchTerm} />
                </div>
                {expanded && <div>
                    {boats.map((boat, i) => {
                        return <FinishBoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={boat.classIdx!}
                            boatIdx={boat.boatIdx!}
                            stageBoat={props.stageBoat}
                            unStageBoat={props.unStageBoat}
                            currentTime={props.currentTime}
                            rando={props.rando}
                            forceUpdate={props.forceUpdate}
                            finished={boat.status === "finished"}
                            finishTime={boat.finishTime ? boat.finishTime : 0}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};