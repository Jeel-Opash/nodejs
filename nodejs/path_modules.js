const path=require("path");
console.log(__dirname)

//schoole folder/student/data.txt

const filepath=path.join("folder","student","data.txt");
const resolve=path.resolve("folder","student","data.txt");
const basenam=path.basename("folder","student","data.txt");
const dir=path.dirname("folder","student","data.txt");
console.log({filepath,resolve,basenam,dir});
