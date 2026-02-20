const fs=require('fs/promises');
const path=require('path');

const filename="asyc.txt"
const filepath =path.join(__dirname,filename);

const filePath1 = __dirname;

// fs.promises.readdir(filepath)
// .then((data)=>console.log(data)).catch((err)=>console.log(err));


const readFolder=async()=>{
    try{
const res=await fs.promises.readdir(filepath);
console.log(res);
    }catch(error){
        console.error(error);
    }
};
readFolder();


const writefile = async()=>{
    try{
   const res= await fs.writeFile(filepath,'hello','utf-8');
    console.log(res)
    }catch(error){
        console.error(error)        
    }
}
writefile();


const Appendfile = async()=>{
    try{
   const res= await fs.appendFile(filepath,'hello','utf-8');
    console.log(res)
    }catch(error){
        console.error(error)
    }
}
Appendfile();