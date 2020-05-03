import { permuteSchedule } from "./permute";
import { parseCourses } from "./parse";
import { filter } from "./filter";
import { ALL_DAYS, Schedule } from "./data";

function createScheduleElement(schedule: Schedule, minHour: number, maxHour: number): HTMLElement {
    const ret = document.createElement("div");
    ret.className = "schedule-container"

    // Header.
    for (let i = 0; i < ALL_DAYS.length; i++) {
        const headerElement = document.createElement("div");
        headerElement.className = "schedule-header";
        headerElement.style.gridColumn = `${i + 2} / span 1`;
        headerElement.style.gridRow = `1 / span 1`;
        const headerLabel = document.createElement("h3");
        headerLabel.className = "schedule-header-label";
        headerLabel.innerHTML = ALL_DAYS[i];
        headerElement.appendChild(headerLabel);
        ret.appendChild(headerElement);
    }

    // Timeline.
    for (let hour = minHour; hour <= maxHour; hour++) {
        const timelineElement = document.createElement("div");
        timelineElement.className = "schedule-timeline";
        timelineElement.style.gridColumn = `1 / span 1`;
        timelineElement.style.gridRow = `${hour - minHour + 1} / span 1`;
        const timelineLabel = document.createElement("p");
        timelineLabel.className = "schedule-timeline-label";
        timelineLabel.innerHTML = [hour, 0].map(x => x.toString().padStart(2, "0")).join(":");
        timelineElement.appendChild(timelineLabel);
        ret.appendChild(timelineElement);
    }

    // Hour-blocks.
    for (let i = 0; i < ALL_DAYS.length; i++) {
        for (let hour = minHour; hour < maxHour; hour++) {
            const hourBlockElement = document.createElement("div");
            hourBlockElement.className = "schedule-hourblock";
            hourBlockElement.style.gridColumn = `${i + 2} / span 1`;
            hourBlockElement.style.gridRow = `${hour - minHour + 2} / span 1`;
            ret.appendChild(hourBlockElement);
        }
    }

    // Schedule elements.
    for (const s of schedule) {
        const scheduleElement = document.createElement("div");
        scheduleElement.className = "schedule-element";
        scheduleElement.style.gridColumn = `${ALL_DAYS.indexOf(s.day) + 2} / span 1`;
        scheduleElement.style.gridRow = `${s.startTime.hour - minHour + 2} / span ${s.endTime.hour - s.startTime.hour}`;
        scheduleElement.style.marginTop = `${5 * s.startTime.minute / 60}em`;
        scheduleElement.style.marginBottom = `${-5 * s.endTime.minute / 60}em`;
        scheduleElement.style.backgroundColor = "aqua";
        const scheduleLabel = document.createElement("b");
        scheduleLabel.className = "schedule-element-label";
        scheduleLabel.innerHTML = s.name;
        scheduleElement.appendChild(scheduleLabel);
        ret.appendChild(scheduleElement);
    }

    return ret;
}

(window as any).showSchedules = function (): void {
    const main = document.getElementById("main");
    // Clear previous results.
    if (main) {
        main.innerHTML = "";
    }
    // Read courses JSON.
    const jsonString = (document.getElementById("json-input") as HTMLTextAreaElement).value;
    const courses = parseCourses(jsonString);
    // Filter desired courses.
    const desiredCoursesString = (document.getElementById("desired-input") as HTMLInputElement).value;
    const desiredCourses = filter(desiredCoursesString.split(";"), courses);
    // Permute.
    const possibleSchedules = permuteSchedule(desiredCourses);
    // Display results.
    if (main) {
        // Find time range.
        let minHour = 12;
        let maxHour = 12;
        for (const c of desiredCourses.values()) {
            for (const opt of c.options) {
                for (const slot of opt) {
                    minHour = Math.min(minHour, slot.startTime.hour);
                    maxHour = Math.max(maxHour, slot.endTime.hour + 1);
                }
            }
        }
        // Create HTML elements.
        for (const schedule of possibleSchedules) {
            const scheduleElement = createScheduleElement(schedule, minHour, maxHour);
            main.appendChild(scheduleElement);
        }
    }
}
