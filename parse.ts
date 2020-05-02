import { Course } from "./data";
export function parseCourses(jsonString: string): Map<string, Course> {
    let obj: Array<Course> = JSON.parse(jsonString);
    let ret: Map<string, Course> = new Map();
    for (let i: number = 0 ; i < obj.length ; i++) {
        ret.set(obj[i].name, obj[i]);
    }
    return ret;
}
