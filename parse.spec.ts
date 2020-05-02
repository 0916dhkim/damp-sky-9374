import { parseCourses } from "./parse";
import { expect } from "chai";
import { Course } from "./data";

describe("parseCourses", function() {
    it("Empty Array", function() {
        const actual = parseCourses("[]");
        expect(actual).to.deep.equals(new Map());
    })

    it("Basic Courses", function() {
        const input: string = `[
            {
                "name": "MA201",
                "options": [
                    [
                        {
                            "day": "Mon",
                            "startTime": {
                                "hour": 11,
                                "minute": 30
                            },
                            "endTime": {
                                "hour": 12,
                                "minute": 30
                            }
                        }
                    ]
                ]
            },
            {
                "name": "MA202",
                "options": [
                    [
                        {
                            "day": "Tue",
                            "startTime": {
                                "hour": 17,
                                "minute": 45
                            },
                            "endTime": {
                                "hour": 20,
                                "minute": 45
                            }
                        }
                    ],
                    [
                        {
                            "day": "Wed",
                            "startTime": {
                                "hour": 12,
                                "minute": 30
                            },
                            "endTime": {
                                "hour": 13,
                                "minute": 30
                            }
                        },
                        {
                            "day": "Fri",
                            "startTime": {
                                "hour": 9,
                                "minute": 0
                            },
                            "endTime": {
                                "hour": 11,
                                "minute": 0
                            }
                        }
                    ]
                ]
            }
        ]`;
        const actual = parseCourses(input);
        const expected: Map<string, Course> = new Map([
            [
                "MA201",
                {
                    "name": "MA201",
                    "options": [
                        [
                            {
                                "day": "Mon",
                                "startTime": {
                                    "hour": 11,
                                    "minute": 30
                                },
                                "endTime": {
                                    "hour": 12,
                                    "minute": 30
                                }
                            }
                        ]
                    ]
                }
            ],
            [
                "MA202",
                {
                    "name": "MA202",
                    "options": [
                        [
                            {
                                "day": "Tue",
                                "startTime": {
                                    "hour": 17,
                                    "minute": 45
                                },
                                "endTime": {
                                    "hour": 20,
                                    "minute": 45
                                }
                            }
                        ],
                        [
                            {
                                "day": "Wed",
                                "startTime": {
                                    "hour": 12,
                                    "minute": 30
                                },
                                "endTime": {
                                    "hour": 13,
                                    "minute": 30
                                }
                            },
                            {
                                "day": "Fri",
                                "startTime": {
                                    "hour": 9,
                                    "minute": 0
                                },
                                "endTime": {
                                    "hour": 11,
                                    "minute": 0
                                }
                            }
                        ]
                    ]
                }
            ]
        ]);
        expect(actual).to.deep.equals(expected);
    })
})
