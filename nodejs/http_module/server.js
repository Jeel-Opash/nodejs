import http from "http";


const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.setHeader("Content-Type","text/html")
        res.write("<h1>i am in destop first page</h1>");
        res.end();
    }

       else if(req.url==="/data"){
                    res.setHeader("Content-Type","text/plain")

        res.write(`"Data" refers to raw, unorganized facts, 
            figures, symbols, or observations, such as
             measurements, names, or numbers, which can be 
             processed to create meaningful information. `);
        res.end();
    }
    else{
        req.statusCode=404;
        res.end("Page is not found")
    }
});
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`${PORT}`);
});