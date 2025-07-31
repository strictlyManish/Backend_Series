const express = require('express');
const ConectetoDb = require('./src/db/db');
const app = express();


app.use(express.json());
ConectetoDb();

app.get('/',(req,res)=>{
    console.log('You are on default page : ')
})

app.listen(3000,()=>{
    console.log('Server runnig on port 3000')
});
