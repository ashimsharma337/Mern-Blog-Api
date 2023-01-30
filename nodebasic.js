const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plane");
    res.end("Hello World!");
})

server.listen(port, hostname, (err, succ) => {
    if(err){
        console.log(`Error Listening on ${port}`);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
})
