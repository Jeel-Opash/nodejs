const fs=require('fs');
const path=require('path');

const filename="fspro.tsx";
const filepath =path.join(__dirname,filename);

const file=__dirname;
fs.promises.readdir(file).then((data)=>console.log(data))
.catch((err)=>console.log(err));