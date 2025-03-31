import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import "./style/boatsTab.css";
import { RaceContext } from "./timerContainer";
import { RightArrow } from "./icons/rightArrow";
import { DownArrow } from "./icons/downArrow";
import { BoatEntry } from "./boatEntry";
import { SearchBar } from "./searchBar";
import type { Boat } from "./types";

type BoatsAllBoatsProps = {
    raceIdx: number,
    forceUpdate: () => void,
    rando: number
};

export const BoatsAllBoats: React.FC<BoatsAllBoatsProps> = (props: BoatsAllBoatsProps) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(expanded ? false : true);
    }
    const raceContext = useContext(RaceContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchParam, setSearchParam] = useState<"name" | "sailNumber" | "boatType">("name");
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
                const aParam = a[searchParam] ? a[searchParam] : "";
                const bParam = b[searchParam] ? b[searchParam] : "";
                if (aParam! > bParam!) {
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
            const boatProperty = boat[searchParam] ? boat[searchParam] : "";
            if (boatProperty!.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                filteredBoats.push(boat);
            }
        });
        filteredBoats.sort((a, b) => {
            const aParam = a[searchParam] ? a[searchParam] : "";
            const bParam = b[searchParam] ? b[searchParam] : "";
            if (aParam! > bParam!) {
                return 1;
            } else {
                return -1;
            }
        });
        setBoats(filteredBoats);
    };

    useEffect(filterBoats, [searchTerm, searchParam]);
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
                        searchParam={searchParam}
                        setSearchTerm={setSearchTerm} />
                </div>
                {expanded && <div>
                    <div className="vertical-space"></div>
                    <div className="horizontal-around">
                        <div 
                            className={searchParam === "name" ? "arrow-button small-text selected-button" : "arrow-button small-text"}
                            onClick={() => setSearchParam("name")}>
                            Boat name
                        </div>
                        <div 
                            className={searchParam === "sailNumber" ? "arrow-button small-text selected-button" : "arrow-button small-text"}
                            onClick={() => setSearchParam("sailNumber")}>
                            Sail number
                        </div>
                        <div 
                            className={searchParam === "boatType" ? "arrow-button small-text selected-button" : "arrow-button small-text"}
                            onClick={() => setSearchParam("boatType")}>
                            Boat type
                        </div>
                    </div>
                    {boats.map((boat, i) => {
                        return <BoatEntry 
                            raceIdx={props.raceIdx}
                            classIdx={boat.classIdx!}
                            boatIdx={boat.boatIdx!}
                            rando={props.rando}
                            forceUpdate={props.forceUpdate}
                            key={i} />;
                    })}
                </div>}
            </div>
        </>
    );
};