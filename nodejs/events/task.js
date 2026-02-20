const Eventmitter = require("events");
const emitter = new Eventmitter();

const eventcount ={
    "user-login":0,
    "user-purchse":0,
    "user-update":0,
    "user-logout":0,
}

emitter.on("user-login",(username)=>{
    eventcount["user-login"]++;
    console.log(`${username} logged in!`);
})
emitter.on("user-purchse",(username,item)=>{
    console.log(`${username} logged in buy${item}!`);
})
emitter.on("user-update",(username,email)=>{
    eventcount["user-update"]++;
    console.log(`${username} logged in email is the :${email}!`);
})
emitter.on("user-logout",(username)=>{
    console.log(`${username} logged out!`);
})

emitter.on("summery",()=>{
    console.log(eventcount);
})
emitter.emit("user-login","Data");
emitter.emit("user-purchse","Data","Laptop");
emitter.emit("user-update","Data","email");
emitter.emit("user-logout","Data");
emitter.emit("summery");