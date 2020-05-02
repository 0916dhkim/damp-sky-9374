import { Course } from "./data";

export function filter(
    names: Array<string>,
    courses: Map<string, Course>
): Map<string, Course> {
    let ret: Map<string, Course> = new Map();
    for (const [courseName, course] of courses) {
        let flag: boolean = false;

        let nameArraySize = names.length;
        for (let j: number = 0 ; j < nameArraySize && !flag ; j++) {
            if (names[j] == courseName) flag = true;
        }

        if (flag == true) ret.set(courseName, course);
    }

    return ret;
}