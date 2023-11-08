// #! /usr/bin/env node

import { faker } from "@faker-js/faker"
import inquirer from "inquirer"
import chalk from "chalk"

// Customer Class
class Customer {
    firstName: string
    lastName: string
    age: number
    gender: string
    mobNumber: number
    accNumber: number

    constructor(fName: string, lName:string, age:number, gender:string, mob:number, acc:number){
        this.firstName = fName
        this.lastName = lName
        this.age = age
        this.gender = gender
        this.mobNumber = mob
        this.accNumber = acc
    }
}

// Interface Bank Account
interface BankAccount {
    accNumber : number,
    balance: number,
}

// Class Bank

class Bank {
    customer : Customer[]=[];
    account : BankAccount[]=[];

    addCustomer(obj:Customer){
        this.customer.push(obj);
    }
    addAccountNumber(obj:BankAccount){
        this.account.push(obj);
    }
    transaction(accobj: BankAccount){
        let NewAccounts = this.account.filter(acc => acc.accNumber !== accobj.accNumber)
        this.account = [...NewAccounts, accobj];
    }

}

let myBank = new Bank();

// let cus = new Customer("Abrar", "Ahmed", 25, "Male", 110448737, 10025796);

// Customer Create

for (let i:number = 1; i <= 3; i++){
    let fName = faker.person.firstName('male')
    let lName = faker.person.lastName()
    let num = parseInt(faker.phone.number("3##-###-###"))
    const cus = new Customer(fName, lName, 25 * i, "Male", num, 1000 + i)
    myBank.addCustomer(cus)
    myBank.addAccountNumber({accNumber: cus.accNumber, balance: 100 * i})

}

// Bank Functionality


async function bankService(Bank:Bank) {
    do{
        let service = await inquirer.prompt({
            type:"list",
            name: "select",
            message: "Please Select the Service",
            choices:["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"]
        })
        // View Balance
        if (service.select == "View Balance"){
            let rec = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter Your Account Number:",
            });
            let account = myBank.account.find((acc)=>acc.accNumber == rec.num)
            if (!account){
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account){
                let name = myBank.customer.find((item)=>item.accNumber == account?.accNumber)
                console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your account balance is ${chalk.bold.blueBright(`$${account.balance}`)}`)
            }
    
        }
        if (service.select == "Cash Withdraw"){
            let rec = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter Your Account Number:",
            });
            let account = myBank.account.find((acc)=>acc.accNumber == rec.num)
            if (!account){
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account){
                let ans = await inquirer.prompt({
                    type:"number",
                    message:"Please Enter your Amount.",
                    name:"rupee",
                })
                if (ans.rupee > account.balance){
                    console.log(chalk.red.bold("Insufficient Balance"))
                }
                let newBalance = account.balance - ans.rupee
                // Transaction Method Call
                Bank.transaction({accNumber:account.accNumber, balance: newBalance})
            }
    
        }
        if (service.select == "Cash Deposit"){
            let rec = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter Your Account Number:",
            });
            let account = myBank.account.find((acc)=>acc.accNumber == rec.num)
            if (!account){
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account){
                let ans = await inquirer.prompt({
                    type:"number",
                    message:"Please Enter your Amount.",
                    name:"rupee",
                })
                let newBalance = account.balance + ans.rupee
                // Transaction Method Call
                Bank.transaction({accNumber:account.accNumber, balance: newBalance})
            }
        }
        if (service.select == "Exit"){
            return}
    }
    while (true)

    }

bankService(myBank)

