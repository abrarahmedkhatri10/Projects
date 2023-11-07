#! /usr/bin/env node
// Classes in typescript
class School {
    addStudent(stdObj) {
        this.students.push(stdObj);
    }
    addTeacher(techObj) {
        this.teachers.push(techObj);
    }
    constructor(name) {
        this.students = [];
        this.teachers = [];
        this.name = name;
    }
}
class Student {
    constructor(name, age, schoolName) {
        this.name = name;
        this.age = age;
        this.schoolName = schoolName;
    }
}
class Teacher extends Student {
}
let school1 = new School("Alpha");
let school2 = new School("Nooby");
let s1 = new Student("Abrar", 26, school1.name);
let s2 = new Student("Bilal", 28, school2.name);
let s3 = new Student("Ahmed", 32, school2.name);
let t1 = new Teacher("Zuhaib", 65, school1.name);
let t2 = new Teacher("Basit", 63, school2.name);
let t3 = new Teacher("Huzaifa", 60, school2.name);
// Add Student
school1.addStudent(s1);
school2.addStudent(s2);
school2.addStudent(s3);
// Add Teacher
school1.addTeacher(t1);
school2.addTeacher(t2);
school2.addTeacher(t3);
console.log(school1);
console.log(school2);
export {};
