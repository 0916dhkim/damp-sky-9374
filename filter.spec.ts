import { filter } from "./filter";
import { expect } from "chai";
import { Course } from "./data";

describe("filter", function() {
    it("Zero Courses", function() {
        expect(filter(["donotmatter"], [])).to.deep.equals([]);
    });
    it("One Out Of Three", function() {
        const names = ["MA101"];
        const courses: Array<Course> = [
            {
                name: "EECS403",
                options: []
            },
            {
                name: "MA101",
                options: []
            },
            {
                name: "ENG120",
                options: []
            }
        ];

        expect(filter(names, courses)).deep.equals([{
            name: "MA101",
            options: []
        }]);
    });
});
