#! /usr/bin/env node

import inquirer from "inquirer"
import { Faker } from "@faker-js/faker";
import { faker } from "@faker-js/faker/locale/af_ZA";


// Users

interface User{
    id:number,
    pin:number,
    name:string,
    accountNumber:number,
    balance:number,
}


const createUser=()=>{
    let users:User[] = []

    for(let i = 0; i<5;i++){
        let user:User = {
            id:i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random()* 900000000),
            balance: 1000000 * i         
        }
        users.push(user)
    }
    return users
}


// ATM Machine

const atmMachine =async (users:User[]) => {

    const res = await inquirer.prompt({
        type:"number",
        message:"write pin code",
        name:"pin"
    })

    const user = users.find(val => val.pin == res.pin)

    if(user){
        console.log(`Welcome ${user.name}`)
        atmFunc(user)
        return
    }
    else{
        console.log("Invalid user pin")
    }
}

// ATM Function


const atmFunc = async(user:User)=>{
    const ans = await inquirer.prompt({
        type:"list",
        name:"select",
        message:"Please Choose Services",
        choices:["Withdraw", "Deposit", "Balance", "Exit"]
    })
    
    if(ans.select == "Withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message: "Enter Amount.",
            name: "rupee",
        })

        if(amount.rupee > user.balance){
            return console.log("Insufficient Balance")
        }

        if(amount.rupee > 25000){
            return console.log("you can not withdraw amount more than 25000")
        }

        console.log(`Withdraw amount: ${amount.rupee}`)
        console.log(`Balance: ${user.balance-amount.rupee}`)
        return
    }

    if(ans.select == "Deposit"){
        const deposit = await inquirer.prompt({
            type:"number",
            message: "Enter Deposit Amount.",
            name: "rupee",
        })

        console.log(`Deposit amount: ${deposit.rupee}`)
        console.log(`Total Balance: ${user.balance+deposit.rupee}`)
        return
    }

    if(ans.select == "Balance"){
        console.log(`Balance: ${user.balance}`)
        return
    }
     
    if(ans.select == "Exit"){
        console.log("Thanks for using ATM.....")
        return
    }

    console.log(ans)
}

const users = createUser()

atmMachine(users)