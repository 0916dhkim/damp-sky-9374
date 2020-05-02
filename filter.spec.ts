import { filter } from "./filter";
import { expect } from "chai";
import { Course } from "./data";

describe("filter", function () {
    it("Zero Courses", function () {
        expect(filter(["donotmatter"], new Map())).to.deep.equals(new Map());
    });
    it("One Out Of Three", function () {
        const names = ["MA101"];
        const courses: Map<string, Course> = new Map([
            ["EECS403", {
                name: "EECS403",
                options: []
            }],
            ["MA101", {
                name: "MA101",
                options: []
            }],
            ["ENG120", {
                name: "ENG120",
                options: []
            }]
        ]);

        expect(filter(names, courses)).deep.equals(new Map(
            [[
                "MA101",
                {
                    name: "MA101",
                    options: []
                }
            ]]
        ));
    });
});
