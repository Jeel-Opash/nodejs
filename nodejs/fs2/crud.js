const fs=require('fs');
const path=require('path');


const file = "fsasycn.txt";
const filepath = path.join(__dirname,file);
fs.writeFile(filepath,"this is the initial data",'utf-8',
    (err)=>{
        if(err)console.error(err);
        else console.log("file is the save");
    }
);


fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err) console.error(err);
    else console.log(data);
});

fs.appendFile(filepath,"\nhello world",'utf-8',(err)=>{
    if(err) console.error(err);
    else
        console.log("file in add data")
    
})

// fs.unlink(filepath,(err)=>{
//      if(err) console.error(err);
//     else
//         console.log("all file are delete ")
// })