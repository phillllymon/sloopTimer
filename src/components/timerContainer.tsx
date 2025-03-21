import React, { useState, useEffect } from "react";
import { Pages } from "./pages";
import "./style.css";
import type { RaceList } from "./types";
import { RaceTitle } from "./raceTitle";
import { FullScreenPrompt } from "./fullScreenPrompt";

const raceList: RaceList = [
    {
        name: "DD 6/20",
        startDay: {
            year: 2025,
            month: 3,
            day: 8
        },
        classes: [
            {
                raceName: "DD 6/20",
                name: "start 4",
                boatList: [
                    {
                        name: "Tatonka",
                        sailNumber: "6969",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 15,
                    seconds: 0
                },
                cleared: false,
                overEarly: [],
            },
            {
                raceName: "DD 6/20",
                name: "start 1",
                boatList: [
                    {
                        name: "Hydra",
                        sailNumber: "1123",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    },
                    {
                        name: "Absolutely",
                        sailNumber: "USA 95",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 0,
                    seconds: 0
                },
                cleared: false,
                overEarly: [],
            }
        ]
    },
    {
        name: "DD 6/27",
        startDay: {
            year: 2025,
            month: 3,
            day: 8
        },
        classes: [
            {
                raceName: "DD 6/27",
                name: "start 4",
                boatList: [
                    {
                        name: "Tatonka",
                        sailNumber: "6969",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 15,
                    seconds: 0
                },
                cleared: false,
                overEarly: [],
            },
            {
                raceName: "DD 6/27",
                name: "start 1",
                boatList: [
                    {
                        name: "Hydra",
                        sailNumber: "1123",
                        status: "waiting",
                        finishTime: false,
                        staged: false
                    }
                ],
                startTime: {
                    hours: 18,
                    minutes: 0,
                    seconds: 0
                },
                cleared: false,
                overEarly: [],
            }
        ]
    }
];

let timeZone = "Pacific";
try {
    timeZone = new Date(Date.now()).toString().split("(")[1].split(")")[0];
} catch (e) {}

const initialStagedBoats: number[][] = [];
export const RaceContext = React.createContext({
    raceList: raceList,
    setNewRaceList: (newRaceList: RaceList): void => {}, // overwritten below
    raceIdx: -1,
    setRaceIdx: (newIdx: number): void => {}, // overwritten below
    currentTime: Date.now(),
    lastUpdateTime: Date.now(),
    timeZone: timeZone,
    stagedBoats: initialStagedBoats,
    setStagedBoats: (newStagedBoats: number[][]): void => {} // overwritten below
});

export const TimerContainer: React.FC = () => {
    const [raceListData, setRaceListData] = useState(raceList);
    const [stagedBoats, setStagedBoats] = useState<number[][]>([]);
    const [raceIdx, setRaceIdx] = useState(-1);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
    
    useEffect(() => {
        const minutePingInterval = setInterval(() => {
            // SPACE FOR CLOCK API HERE
            setCurrentTime(Date.now());     // change to official time - adjust for API response time
            setLastUpdateTime(Date.now());  // system time of last update from API
        }, 60000);

        return () => {
            clearInterval(minutePingInterval);
        };
    }, []);

    const setNewRaceListData = (newRaceList: RaceList) => {
        // SPACE FOR MIDDLEWARE HERE
        setRaceListData(newRaceList);
    }

    const [fullScreen, setFullScreen] = useState(false);
    return (
        <RaceContext.Provider value={{
            raceList: raceListData,
            setNewRaceList: setNewRaceListData,
            raceIdx: raceIdx,
            setRaceIdx: setRaceIdx,
            currentTime: currentTime,
            lastUpdateTime: lastUpdateTime,
            timeZone: timeZone,
            stagedBoats: stagedBoats,
            setStagedBoats: setStagedBoats
        }}>
            <div id="full-screen-component">
                {/* {!fullScreen && <FullScreenPrompt hideModal={() => setFullScreen(true)} />} */}
                <div className="all-background"></div>
                
                <RaceTitle />
                <Pages />
            </div>
        </RaceContext.Provider>
    );
};