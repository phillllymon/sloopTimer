export type Boat = {
    name: string,
    sailNumber?: string
    phrf?: number,
    notes?: string
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
    startTime?: StartTime
}

export type Race = {
    name: string,
    classes: BoatClass[],
    startDay: StartDay
};

export type RaceList = Race[];