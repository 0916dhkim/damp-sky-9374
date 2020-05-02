/**
 * Time of day.
 * Using 24-hr format.
 */
export interface Time {
    hour: number;
    minute: number;
}

/**
 * Days in week.
 */
export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

/**
 * Readonly array containing all days starting from Monday.
 */
export const ALL_DAYS: ReadonlyArray<Day> = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];

export interface Slot {
    day: Day;
    startTime: Time;
    endTime: Time;
}

export interface Course {
    name: string;
    options: Array<Array<Slot>>;
}

/**
 * Represents a single block of schedule.
 */
export interface ScheduleElement {
    name: string;
    day: Day;
    startTime: Time;
    endTime: Time;
};

/**
 * List of schedule elements
 * sorted in chronological order.
 */
export type Schedule = Array<ScheduleElement>;
