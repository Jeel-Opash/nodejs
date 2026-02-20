import fs from "fs";
import readline from 'readline';
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const filecreate=()=>{
    rl.question('Enter your filename:',(filename)=>{
        rl.question("enter the file data:",(data)=>{
            fs.writeFile(`${filename}.txt`,data,(err)=>{
                if(err){
                console.error(`Error `)}
            else{
                console.log("file is create");
            }
        rl.close();
    })
        })
    })
}
filecreate();