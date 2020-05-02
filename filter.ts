import { Course } from "./data";

export function filter(nameArray: Array<string>, courseArray: Array<Course>): Array<Course> {
    let ret: Array<Course> = [];
    let courseArraySize: number = courseArray.length;
    for (let i: number = 0; i < courseArraySize ; i++) {
        let flag: boolean = false;
        let course: Course = courseArray[i];
        let courseName: string = course.name;

        let nameArraySize = nameArray.length;
        for (let j: number = 0 ; j < nameArraySize && !flag ; j++) {
            if (nameArray[j] == courseName) flag = true;
        }

        if (flag == true) ret.push(course);
    }

    return ret;
}