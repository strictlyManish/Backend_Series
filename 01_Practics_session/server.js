const express = require('express');
const app = express();
app.use(express.json());

const database = [];

app.get('/', function (req, res) {
    res.json({
        message: 'You are on default page ',
        database: database
    });
})


app.post('/create', function (req, res) {
    if (req.body == undefined) {
        res.json({
            message: 'Date gating faild or kindly pass body '
        });
    } else {
        let data = req.body;
        database.push(data);
        res.json({
            message: 'Data saved sucssfully',
            database: database
        });
    }
})

app.delete('/delete/:id', function (req, res) {
    let { id } = req.params;

    if (id) {
        delete database[id];
        res.send({
            message: 'Data deleted or removed',
            database: database
        })
    } else {
        res.json({
            message: 'Faild to load getting ID or do not enter alphabet character',
            database: database
        });
    }
});


app.put('/update/:id',function(req,res){
    let {id} = req.params;
    let message = req.body.language;

    if(id && message && database.length > 0){
        database[id].language = message;
        res.send({
            message:'Data update successfully : ',
            database:database
        })
    }else{
        res.send('somthig is fishy')
    }
})


app.listen(5000, function () {
    console.log('Server runnig on port 5000')
})