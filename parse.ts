import { Course } from "./data";
export function parseCourses(jsonString: string): Array<Course> {
    return JSON.parse(jsonString);
}
