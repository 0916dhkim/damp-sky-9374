import { permuteSchedule } from "./permute";
import { parseCourses } from "./parse";
import { filter } from "./filter";

(window as any).showSchedules = function (): void {
    // Read courses JSON.
    const jsonString = (document.getElementById("json-input") as HTMLTextAreaElement).value;
    const courses = parseCourses(jsonString);
    // Filter desired courses.
    const desiredCoursesString = (document.getElementById("desired-input") as HTMLInputElement).value;
    const desiredCourses = filter(desiredCoursesString.split(";"), courses);
    // Permute.
    const possibleSchedules = permuteSchedule(desiredCourses);
    // Display results.
    const main = document.getElementById("main");
    if (main) {
        main.innerHTML = JSON.stringify(possibleSchedules, null, 2);
    }
}
