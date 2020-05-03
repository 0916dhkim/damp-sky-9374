import { Course } from "./data";

export function filter(
    names: Array<string>,
    courses: Map<string, Course>
): Map<string, Course> {
    let ret: Map<string, Course> = new Map();
    const nameSet = new Set(names);
    for (const [courseName, course] of courses) {
        if (nameSet.has(courseName)) {
            ret.set(courseName, course);
        }
    }

    return ret;
}