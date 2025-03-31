import React, { useState, useEffect } from "react";
import { Pages } from "./pages";
import "./style.css";
import type { RaceList } from "./types";
import { RaceTitle } from "./raceTitle";
import { FullScreenPrompt } from "./fullScreenPrompt";

const raceList: RaceList = [
    {
        name: "Fancy Race",
        startDay: {
            year: 2025,
            month: 3,
            day: 25
        },
        classes: [
            {
                raceName: "Fancy Race",
                name: "slow boats",
                boatList: [
                    {
                        name: "Tatonka",
                        sailNumber: "6969",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Snow Goose",
                        sailNumber: "1066",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Kari-J",
                        sailNumber: "blank",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Boomerang",
                        sailNumber: "69",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Hula Hula",
                        sailNumber: "040",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Thundorca",
                        sailNumber: "394",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Hare",
                        sailNumber: "8",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Bismark",
                        sailNumber: "73",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Reliance",
                        sailNumber: "USA 31",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Australia II",
                        sailNumber: "AU 83",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Victory",
                        sailNumber: "1810",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Red October",
                        sailNumber: "1917",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Mada Hari",
                        sailNumber: "1945",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
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
                raceName: "Fancy Race",
                name: "fast boats",
                boatList: [
                    {
                        name: "Hydra",
                        sailNumber: "1123",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Absolutely",
                        sailNumber: "USA 95",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
                    },
                    {
                        name: "Enterprise",
                        sailNumber: "6969",
                        status: "signed up",
                        finishTime: false,
                        staged: false,
                        boatType: "J 24"
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
        name: "Duck Dodge",
        startDay: {
            year: 2025,
            month: 3,
            day: 8
        },
        classes: [
            {
                raceName: "Duck Dodge",
                name: "start 4",
                boatList: [
                    {
                        name: "Tatonka",
                        sailNumber: "6969",
                        status: "signed up",
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
                raceName: "Duck Dodge",
                name: "start 1",
                boatList: [
                    {
                        name: "Hydra",
                        sailNumber: "1123",
                        status: "signed up",
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