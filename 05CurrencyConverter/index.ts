#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Currency Converter API Link
let apiLink = "https://v6.exchangerate-api.com/v6/b9af1d4125beebadf6d0b3b0/latest/PKR";
// Fetching Data
let fetchData = async (data:any) => {
    let fetchData = await fetch(data)
    let res = await fetchData.json()
    return res.conversion_rates;
};
let data = await fetchData(apiLink)
// Object to array
let countries = Object.keys(data);

// User Input First Country
let firstCountry = await inquirer.prompt({
    type:"list",
    name: "name",
    message:"Converting From", 
    choices: countries,
}); 


// console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}`);

// First Country Money
let userMoney= await inquirer.prompt({
    type:"number",
    name: "rupee",
    message: `Please enter the  amount in ${chalk.greenBright.bold(firstCountry.name)}`

})

// Convert Country
let secondCountry = await inquirer.prompt({
    type:"list",
    name: "name",
    message:"Converting to ",
    choices: countries,
});

// Convertion Rate
let cnv = `https://v6.exchangerate-api.com/v6/b9af1d4125beebadf6d0b3b0/pair/${firstCountry.name}/${secondCountry.name}`;

// Fetching data for conversion rate
let cnvData = async (data:any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);


let convertedRate = userMoney.rupee * conversionRate

console.log(`Your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.rupee)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);