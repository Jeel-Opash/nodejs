import readline from "readline";
const rl= readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const todos = [];

const showMenu = ()=>{
    console.log("\n1:Add a Task");
    console.log("2:View Tasks");
    console.log("3:Exit");
    rl.question("choose the option:",handleinput)
}

const handleinput=(Option)=>{
    if(Option==="1"){
        rl.question("enter the task:",(task)=>{
            todos.push(task);
            console.log("Task added:",task);
            showMenu();
        })
        
    }
      else  if(Option==="2"){
        console.log("\nYour Todo Lists");
        todos.forEach((curr,index)=>{
            console.log(`${index+1}.${curr}`)
        })
        showMenu();
        
    }
       else if(Option==="3"){
      console.log("exit");
      rl.close();
       }
      else{
        console.log("Invalid");
      showMenu();
        
    }
}

showMenu();