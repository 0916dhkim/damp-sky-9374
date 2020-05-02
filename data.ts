export interface Time {
    hour: number;
    minute: number;
}

export interface Slot {
    day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    startTime: Time;
    endTime: Time;
}

export interface Course {
    name: string;
    options: Array<Array<Slot>>;
}
