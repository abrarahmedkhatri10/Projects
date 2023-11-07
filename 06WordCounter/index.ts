#! /usr/bin/env node

import inquirer from "inquirer"

function counter(paragraph:string){
    let freeWhiteSpace = paragraph.replace(/\s/g,"")

    return freeWhiteSpace.length

}

// console.log(counter("Hello Abrar Ahmed"))

async function startWordCount(counter:(paragraph: string)=>number){
    do{

        let res = await inquirer.prompt({
            type:"input",
            message:"write paragraph here...",
            name:"paragraph",
        })
        console.log(counter(res.paragraph))
    }
    while(true)
    
}

startWordCount(counter)