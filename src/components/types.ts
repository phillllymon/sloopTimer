export type Boat = {
    name: string,
    sailNumber?: string
    phrf?: number,
    notes?: string,
    boatType?: string,
    status: "signed up" | "checked in" | "early" | "racing" | "finished" | "dnf" | "retired",
    finishTime: false | number,  // ms timestamp, not courseTime
    staged: boolean,
    classIdx?: number,
    boatIdx?: number,
    listedFinishTimes?: number[]
};

export type StartTime = {
    hours: number,
    minutes: number,
    seconds: number
}

export type StartDay = {
    year: number,
    month: number,
    day: number
}

export type BoatClass = {
    raceName: string,
    name: string,
    boatList: Boat[],
    startTime: StartTime,
    cleared: boolean,
    overEarly: string[] // use boat name
}

export type Race = {
    name: string,
    classes: BoatClass[],
    startDay: StartDay
};

export type RaceList = Race[];