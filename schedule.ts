import { Schedule, ScheduleElement } from "./data";

/**
 * Add an element to a schedule.
 * Do not modify the original.
 * Assume the given schedule is sorted.
 * @param schedule Original schedule.
 * @param element Element to be added.
 */
export function addScheduleElement(schedule: Schedule, element: ScheduleElement): Schedule {
    let ret: Schedule = [];
    let scheduleSize: number = schedule.length;
    let flag: boolean = false;
    for (let i: number = 0 ; i < scheduleSize ; i++) {
        if (schedule[i].startTime >= element.startTime && !flag) {
            ret.push(schedule[i]);
            flag = true;
        } // includes when there's a duplicate start time
        ret.push(schedule[i]);
    }
    return ret;
}

/**
 * Check if the given schedule has collisions.
 * @param schedule 
 * @returns True if collides.
 */
export function checkScheduleCollision(schedule: Schedule): boolean {
    let scheduleSize: number = schedule.length;
    for (let i: number = 1; i < scheduleSize ; i++) {
        if (schedule[i].startTime < schedule[i - 1].endTime) return true;
    }
    return false;
}
