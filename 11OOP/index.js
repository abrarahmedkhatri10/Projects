#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    constructor(n) {
        this.name = n;
    }
}
class Person {
    constructor() {
        this.students = [];
    }
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        console.log("Welcome guest");
        const ans = await inquirer.prompt({
            type: "list",
            message: "Who do you like to talk to?",
            name: "select",
            choices: ["Self", "Student"],
        });
        if (ans.select == "Self") {
            console.log("Hello i'm talking to myself");
            console.log("I am feeling well.");
        }
        if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                type: "input",
                message: "Which student do you want to talk to?",
                name: "student",
            });
            const student = persons.students.find((val) => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Hello i am ${name.name}, I am feeling well`);
                console.log(persons.students);
            }
            if (student) {
                console.log(`Hello i am ${student.name}, I am feeling well...`);
                console.log(persons.students);
            }
        }
    } while (true);
};
programStart(persons);
