import { Course } from "./data";

export function filter(nameArray: Array<string>, courseArray: Array<Course>): Array<Course> {
    let courseArraySize: number = courseArray.length;
    let i: number = 0;
    while (i < courseArraySize) {
        let flag: boolean = false;
        let course: Course = courseArray[i];
        let courseName: string = course[name];

        let nameArraySize = nameArray.length;
        for (let j: number = 0 ; j < nameArraySize && !flag ; j++) {
            if (nameArray[j] == courseName) flag = true;
        }

        if (flag == true) i++;
        else courseArray.splice(i, 1);
    }

    return courseArray;
}