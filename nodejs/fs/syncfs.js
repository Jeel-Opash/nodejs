const fs = require('fs');
const path = require('path');


// createfile
const filename = "test.txt";
const filepath=path.join(__dirname,filename);
console.log(__dirname);
const writefile=fs.writeFileSync(filepath,"this is a Node js ,ssss",'utf-8');
console.log(writefile);



//readfile
const readfile = fs.readFileSync(filepath,'utf-8')
console.log(readfile);



//update file 
const appendfile=fs.appendFileSync(filepath,
    "\nthis is the initial data",'utf-8');
console.log(appendfile);
const readata=fs.readFileSync(filepath,'utf-8');
console.log(readata);



// filedalete
// const filedelete=fs.unlinkSync(filepath);
// console.log(filedelete);


//renameing
const updatefilename="updatetest.txt";
const newfile=path.join(__dirname,updatefilename);
const renameFile=fs.renameSync(filepath,newfile);
console.log(renameFile);