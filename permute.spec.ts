import { expect } from "chai";
import { Course, Slot, Schedule, ScheduleElement } from "./data";
import { permuteSchedule } from "./permute";

function scheduleElementToString(element: ScheduleElement): string {
    return [
        element.name,
        element.day,
        `${element.startTime.hour.toString().padStart(2, "0")}:${element.startTime.minute.toString().padStart(2, "0")}`,
        "-",
        `${element.endTime.hour.toString().padStart(2, "0")}:${element.endTime.minute.toString().padStart(2, "0")}`
    ].join(" ");
}

function scheduleToString(schedule: Schedule): string {
    return schedule.map(scheduleElementToString).join("\n");
}

describe("permuteSchedule", function() {
    it("Zero Courses", function() {
        const courses: Map<string, Course> = new Map();
        const actual = permuteSchedule(courses);
        expect(actual).deep.equals([]);
    });
    it("Realistic", function() {
        const AOption1Slot1: Slot = {
            day: "Mon",
            startTime: {
                hour: 10,
                minute: 0
            },
            endTime: {
                hour: 13,
                minute: 0
            }
        };
        const AOption2Slot1: Slot = {
            day: "Thu",
            startTime: {
                hour: 12,
                minute:0
            },
            endTime: {
                hour: 15,
                minute: 0
            }
        };
        const AOption3Slot1: Slot = {
            day: "Fri",
            startTime: {
                hour: 9,
                minute: 0
            },
            endTime: {
                hour: 12,
                minute: 0
            }
        };
        const BOption1Slot1: Slot = {
            day: "Tue",
            startTime: {
                hour: 11,
                minute: 0
            },
            endTime: {
                hour: 12,
                minute: 0
            }
        };
        const BOption1Slot2: Slot = {
            day: "Wed",
            startTime: {
                hour: 10,
                minute: 0
            },
            endTime: {
                hour: 12,
                minute: 0
            }
        };
        const BOption2Slot1: Slot = {
            day: "Mon",
            startTime: {
                hour: 9,
                minute: 0
            },
            endTime: {
                hour: 10,
                minute: 0
            }
        };
        const BOption2Slot2: Slot = {
            day: "Tue",
            startTime: {
                hour: 10,
                minute: 0
            },
            endTime: {
                hour: 12,
                minute: 0
            }
        };
        const COption1Slot1: Slot = {
            day: "Thu",
            startTime: {
                hour: 11,
                minute: 0
            },
            endTime: {
                hour: 13,
                minute: 0
            }
        };
        const COption2Slot1: Slot = {
            day: "Fri",
            startTime: {
                hour: 11,
                minute: 0
            },
            endTime: {
                hour: 13,
                minute: 0
            }
        };
        const courseA: Course = {
            name: "A",
            options: [
                [AOption1Slot1],
                [AOption2Slot1],
                [AOption3Slot1]
            ]
        };
        const courseB: Course = {
            name: "B",
            options: [
                [BOption1Slot1, BOption1Slot2],
                [BOption2Slot1, BOption2Slot2]
            ]
        };
        const courseC: Course = {
            name: "C",
            options: [
                [COption1Slot1],
                [COption2Slot1]
            ]
        };
        const courses: Map<string, Course> = new Map([
            ["A", courseA],
            ["B", courseB],
            ["C", courseC]
        ]);
        const actual = permuteSchedule(courses);
        const A11Element = { name: "A", ...AOption1Slot1 };
        const A21Element = { name: "A", ...AOption2Slot1 };
        const A31Element = { name: "A", ...AOption3Slot1 };
        const B11Element = { name: "B", ...BOption1Slot1 };
        const B12Element = { name: "B", ...BOption1Slot2 };
        const B21Element = { name: "B", ...BOption2Slot1 };
        const B22Element = { name: "B", ...BOption2Slot2 };
        const C11Element = { name: "C", ...COption1Slot1 };
        const C21Element = { name: "C", ...COption2Slot1 };
        const expected = [
            [A11Element, B11Element, B12Element, C11Element],
            [A11Element, B11Element, B12Element, C21Element],
            [B21Element, A11Element, B22Element, C11Element],
            [B21Element, A11Element, B22Element, C21Element],
            [B11Element, B12Element, A21Element, C21Element],
            [B21Element, B22Element, A21Element, C21Element],
            [B11Element, B12Element, C11Element, A31Element],
            [B21Element, B22Element, C11Element, A31Element]
        ];
        expect(actual.map(scheduleToString).sort()).deep.equals(expected.map(scheduleToString).sort());
    });
});
