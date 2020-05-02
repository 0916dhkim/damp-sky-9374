import { Schedule, ScheduleElement, Time, ALL_DAYS } from "./data";
/**
 * @param a 
 * @param b 
 * @returns true when a is chronologically later than b
 */
function compareTime(a: Time, b: Time): boolean {
    if (a.hour > b.hour) return true;
    else if (a.hour < b.hour) return false;
    else {
        if (a.minute >= b.minute) return true;
    }
    return false; // implicit condition of when a.minute <= b.minute even if a and b are same time
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
            else if (ALL_DAYS.indexOf(schedule[i].day) === ALL_DAYS.indexOf(element.day) && compareTime(schedule[i].startTime, element.startTime)) {
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
    let scheduleSize: number = schedule.length;
    for (let i: number = 1; i < scheduleSize ; i++) {
        if (ALL_DAYS.indexOf(schedule[i - 1].day) === ALL_DAYS.indexOf(schedule[i].day) && compareTime(schedule[i - 1].endTime, schedule[i].startTime)) return true;
    }
    return false;
}
