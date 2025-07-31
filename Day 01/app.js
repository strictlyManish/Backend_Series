const http = require('http');

const server = http.createServer((req,res)=>{
    res.end('Hello world from server')
});

server.listen(3000,()=>{
    console.log('Server runnig on port no 3000')
});

