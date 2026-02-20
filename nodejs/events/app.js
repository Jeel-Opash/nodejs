const Eventmitter = require("events");

const emitter = new Eventmitter();

emitter.on("greet",()=>{
    console.log(`helllo`);
});
emitter.emit("greet")



emitter.on("greet",(user,sym)=>{
    console.log(`helllo ${user} ${sym}`);
});
emitter.emit("greet" , "world","!")



emitter.on("greet",(arg)=>{
    console.log(`helllo ${arg.user} ${arg.sym}`);
});
emitter.emit("greet" ,{ user:"world",sym:"!"});