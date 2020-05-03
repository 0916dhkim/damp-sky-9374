import { Schedule, ScheduleElement, Time, ALL_DAYS } from "./data";
/**
 * @param a 
 * @param b 
 * @returns positive number when a is later than b, 0 when a is equal to b, negative number when a is earlier than b
 */
function compareTime(a: Time, b: Time): number {
    if (a.hour === b.hour) {
        return a.minute - b.minute;
    } else {
        return a.hour - b.hour;
    }
}

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
        if (!flag) {
            if (ALL_DAYS.indexOf(schedule[i].day) > ALL_DAYS.indexOf(element.day)) {
                ret.push(element);
                flag = true;
            } // includes when there's a duplicate start time
            else if (ALL_DAYS.indexOf(schedule[i].day) === ALL_DAYS.indexOf(element.day) && compareTime(schedule[i].startTime, element.startTime) > 0) {
                ret.push(element);
                flag = true;
            }
        }
        
        ret.push(schedule[i]);
    }
    if (!flag) ret.push(element);
    return ret;
}

/**
 * Check if the given schedule has collisions.
 * @param schedule 
 * @returns True if collides.
 */
export function checkScheduleCollision(schedule: Schedule): boolean {
    const scheduleSize: number = schedule.length;
    let flag: boolean = false;
    for (let i: number = 0; i < scheduleSize - 1 ; i++) {
        // if adjacent schedule element has a same date and have comflicting time, return true as it has a schedule collision
        if (ALL_DAYS.indexOf(schedule[i].day) === ALL_DAYS.indexOf(schedule[i + 1].day) && !flag) {
            if (compareTime(schedule[i].endTime, schedule[i + 1].startTime) > 0 && !flag) {
                flag = true;
            }
        }
    }
    return flag;
}
