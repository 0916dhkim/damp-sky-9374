import { expect } from "chai";
import { Schedule, ScheduleElement } from "./data";
import { addScheduleElement, checkScheduleCollision } from "./schedule";

describe("addScheduleElement", function() {
    it("Empty Schedule", function() {
        const schedule: Schedule = [];
        const element: ScheduleElement = {
            name: "RP777",
            day: "Thu",
            startTime: {
                hour: 10,
                minute: 15
            },
            endTime: {
                hour: 11,
                minute: 45
            }
        };
        const actual = addScheduleElement(schedule, element);
        expect(actual).deep.equals([element]);
    });
    describe("Three Element Test", function() {
        const first: ScheduleElement = {
            name: "A",
            day: "Mon",
            startTime: {
                hour: 9,
                minute: 0
            },
            endTime: {
                hour: 11,
                minute: 0
            }
        }
        const second: ScheduleElement = {
            name: "B",
            day: "Mon",
            startTime: {
                hour: 10,
                minute: 0
            },
            endTime: {
                hour: 12,
                minute: 0
            }
        }
        const third: ScheduleElement = {
            name: "C",
            day: "Mon",
            startTime: {
                hour: 12,
                minute: 30
            },
            endTime: {
                hour: 13,
                minute: 30
            }
        }
        const fourth: ScheduleElement = {
            name: "D",
            day: "Tue",
            startTime: {
                hour: 12,
                minute: 30
            },
            endTime: {
                hour: 13,
                minute: 30
            }
        }
        it("Prepend", function() {
            const schedule: Schedule = [second, third];
            const actual = addScheduleElement(schedule, first);
            expect(actual).deep.equals([first, second, third]);
        });
        it("Append", function() {
            const schedule: Schedule = [first, second];
            const actual = addScheduleElement(schedule, third);
            expect(actual).deep.equals([first, second, third]);
        });
        it("In The Middle", function() {
            const schedule: Schedule = [first, third];
            const actual = addScheduleElement(schedule, second);
            expect(actual).deep.equals([first, second, third]);
        });
        it("How about different days with same time?", function() {
            const schedule: Schedule = [first, third];
            const actual = addScheduleElement(schedule, fourth);
            expect(actual).deep.equals([first, third, fourth]);
        })
    });
});

describe("checkScheduleCollision", function() {
    it("Empty Schedule", function() {
        const actual = checkScheduleCollision([])
        expect(actual).to.be.false;
    });
    describe("Three Element Tests", function() {
        const first: ScheduleElement = {
            name: "A",
            day: "Mon",
            startTime: {
                hour: 9,
                minute: 0
            },
            endTime: {
                hour: 11,
                minute: 0
            }
        }
        const second: ScheduleElement = {
            name: "B",
            day: "Mon",
            startTime: {
                hour: 10,
                minute: 0
            },
            endTime: {
                hour: 12,
                minute: 0
            }
        }
        const third: ScheduleElement = {
            name: "C",
            day: "Mon",
            startTime: {
                hour: 12,
                minute: 30
            },
            endTime: {
                hour: 13,
                minute: 30
            }
        }
        const fourth: ScheduleElement = {
            name: "D",
            day: "Tue",
            startTime: {
                hour: 12,
                minute: 30
            },
            endTime: {
                hour: 13,
                minute: 30
            }
        }
        it("AB", function() {
            const actual = checkScheduleCollision([first, second]);
            expect(actual).to.be.true;
        });
        it("BC", function() {
            const actual = checkScheduleCollision([second, third]);
            expect(actual).to.be.false;
        });
        it("AC", function() {
            const actual = checkScheduleCollision([first, third]);
            expect(actual).to.be.false;
        });
        it("ABC", function() {
            const actual = checkScheduleCollision([first, second, third]);
            expect(actual).to.be.true;
        });
        it("ABCD", function() {
            const actual = checkScheduleCollision([first, second, third, fourth]);
            expect(actual).to.be.true;
        });
    });
    it("Adjacent Schedule Elements", function() {
        const a: ScheduleElement = {
            name: "A",
            day: "Sun",
            startTime: {
                hour: 10,
                minute: 0
            },
            endTime: {
                hour: 13,
                minute: 0
            }
        };
        const b: ScheduleElement = {
            name: "B",
            day: "Sun",
            startTime: {
                hour: 9,
                minute: 0
            },
            endTime: {
                hour: 10,
                minute: 0
            }
        };
        const actual = checkScheduleCollision([b, a]);
        expect(actual).to.be.false;
    });
});
