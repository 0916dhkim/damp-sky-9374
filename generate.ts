import { Course, Slot, ALL_DAYS, Day, Time } from "./data";

const alphabetSet: Set<string> = new Set([
    "Q","E", "R", "T", "U", "P", "A", "S", "D", "F", "G", "H", "J", "K", "C", "B", "N", "M"
]);

const minHour = 8;
const maxHour = 21;
const minOptionCount = 1;
const maxOptionCount = 8;

function generateRandomSlot(day: Day, numHours: number): Slot {
    const startTime: Time = {
        hour: Math.floor(Math.random() * (maxHour - minHour)) + minHour,
        minute: Math.floor(Math.random() * 12) * 5
    };
    return {
        day: day,
        startTime: startTime,
        endTime: {
            hour: startTime.hour + numHours,
            minute: startTime.minute
        }
    }
}

function generateRandomName(): string {
    let ret = "";
    const alphabets = Array.from(alphabetSet);
    for (let i = 0; i < 3; i++) {
        ret += alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    ret += (Math.floor(Math.random() * 4) + 1).toString();
    ret += Math.floor(Math.random() * 1000).toString();
    return ret;
}

export function generateRandomCourse(numHours: number): Course {
    const options: Array<Array<Slot>> = [];
    const optionCount = Math.floor(Math.random() * (maxOptionCount - minOptionCount)) + minOptionCount;
    for (let i = 0; i < optionCount; i++) {
        const option: Array<Slot> = [];
        const firstSlotDuration = Math.floor(Math.random() * numHours) + 1;
        const secondSlotDuration = numHours - firstSlotDuration;
        let daysPool: Array<Day> = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        const firstSlotDay = daysPool.splice(Math.floor(Math.random() * daysPool.length), 1)[0];
        const secondSlotDay = daysPool.splice(Math.floor(Math.random() * daysPool.length), 1)[0];
        option.push(generateRandomSlot(firstSlotDay, firstSlotDuration));
        if (secondSlotDuration !== 0) {
            option.push(generateRandomSlot(secondSlotDay, secondSlotDuration));
        }
        options.push(option);
    }
    return {
        name: generateRandomName(),
        options: options
    }
};