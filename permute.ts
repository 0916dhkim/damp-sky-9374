import { Course, Schedule, Slot, ScheduleElement} from "./data";
import { addScheduleElement, checkScheduleCollision} from "./schedule";

/**
 * Calculate schedule permutation.
 * @param courses Courses to be permuted.
 * @returns Array of all possible schedules that can be built from courses.
 */
export function permuteSchedule(courses: Map<string, Course>): Array<Schedule> {
    let ret: Array<Schedule> = [];
    let coursenames = Array.from(courses.keys());

    let permuteRecursively = (names: Array<string>, builder: Schedule): void => {
        // base case
        if (names.length === 0) {
            ret.push(builder);
        }
        // recurse: if the list exist
        else {
            const firstCourse = courses.get(names[0]);
            if (!firstCourse) {
                throw "It is impossible for firstCourse to be null since the first if condition checks whether names is empty.";
            }
            const options = firstCourse.options;
            for (const option of options) {
                let builderAdded: Schedule = builder;
                // adding all timeslots within the option
                for (const slot of option) {
                    const block: ScheduleElement = {
                        name: names[0],
                        day: slot.day,
                        startTime: slot.startTime,
                        endTime: slot.endTime
                    }
                    builderAdded = addScheduleElement(builderAdded, block);
                }
                // check if added blocks form a valid schedule
                // if it is, recursively call the function
                if (!checkScheduleCollision(builderAdded)) {
                    const newNames: Array<string> = names.slice(1, names.length);
                    permuteRecursively(newNames, builderAdded);
                }
            }    

        }
    }

    permuteRecursively(coursenames, []);
    return ret;
}
