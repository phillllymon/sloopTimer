import React, { useState } from "react";
import { Pages } from "./pages";
import "./style.css";
import type { RaceList } from "./types";
import { RaceTitle } from "./raceTitle";

const raceList: RaceList = [
    {
        name: "DD 6/20",
        startDay: {
            year: 2025,
            month: 6,
            day: 20
        },
        classes: [
            {
                raceName: "DD 6/20",
                name: "start 4",
                boatList: [
                    {
                        name: "Tatonka",
                        sailNumber: "6969"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066"
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 15,
                    seconds: 0
                }
            },
            {
                raceName: "DD 6/20",
                name: "start 1",
                boatList: [
                    {
                        name: "Hydra",
                        sailNumber: "1123"
                    },
                    {
                        name: "Absolutely",
                        sailNumber: "USA 95"
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 0,
                    seconds: 0
                }
            }
        ]
    },
    {
        name: "DD 6/27",
        startDay: {
            year: 2025,
            month: 6,
            day: 27
        },
        classes: [
            {
                raceName: "DD 6/27",
                name: "start 4",
                boatList: [
                    {
                        name: "Tatonka",
                        sailNumber: "6969"
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 15,
                    seconds: 0
                }
            },
            {
                raceName: "DD 6/27",
                name: "start 1",
                boatList: [
                    {
                        name: "Hydra",
                        sailNumber: "1123"
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 0,
                    seconds: 0
                }
            }
        ]
    }
];

export const RaceContext = React.createContext({
    raceList: raceList,
    setNewRaceList: (newRaceList: RaceList): void => {}, // overwritten below
    raceIdx: -1,
    setRaceIdx: (newIdx: number): void => {}, // overwritten below
});

export const TimerContainer: React.FC = () => {
    const [raceListData, setRaceListData] = useState(raceList);
    const [raceIdx, setRaceIdx] = useState(-1);
    const setNewRaceListData = (newRaceList: RaceList) => {
        // SPACE FOR MIDDLEWARE HERE
        setRaceListData(newRaceList);
    }
    return (
        <RaceContext.Provider value={{
            raceList: raceListData,
            setNewRaceList: setNewRaceListData,
            raceIdx: raceIdx,
            setRaceIdx: setRaceIdx
        }}>
            <div>
                <div className="all-background"></div>
                
                <RaceTitle />
                <Pages />
            </div>
        </RaceContext.Provider>
    );
};