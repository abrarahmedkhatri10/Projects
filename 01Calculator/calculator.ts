#! /usr/bin/env node

import inquirer from "inquirer"
import { Sum } from './add.js'
import { Subtract } from './subtraction.js'
import { Multiply } from './multiply.js'
import { Division } from './division.js'
import { type } from "os"

const num = await inquirer.prompt([
    {
    name: "firstNum",
    message: "Enter Your First Number",
    type: "number",
    },
    {
    name: "secondNum",
    message: "Enter Your Second Number",
    type: "number",
    },
    {
    type: "list",
    message: "Enter Operator",
    choices:["+","-","*","/"],
    name: "operator"
}])

if (num.operator === "+"){
    let result = Sum(num.firstNum, num.secondNum);
    console.log("Result is: ", result);
}
else if (num.operator === "-"){
    let result = Subtract(num.firstNum, num.secondNum);
    console.log("Result is: ", result);
}
else if (num.operator === "*"){
    let result = Multiply(num.firstNum, num.secondNum);
    console.log("Result is: ", result);
}
else if (num.operator === "/"){
    let result = Division(num.firstNum, num.secondNum);
    console.log("Result is: ", result);
}