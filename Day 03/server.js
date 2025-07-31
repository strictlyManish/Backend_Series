const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());

const database = [];

app.get('/',(req,res)=>{
    
    res.json({
        message:`Data updated ${database.length}`,
        data:database
    });
});

app.post('/notes',(req,res)=>{
    database.push(req.body);
    res.json({
        message:'Data Added Successfully !',
        data:database
    });
});

app.listen(port,()=>{
    console.log(`Backend working on port ${port}`)
});