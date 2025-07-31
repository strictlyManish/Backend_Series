const e = require('express');
const express = require('express');
const app = express();
const database = [];

// this middleware is used to read json data
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Page working sucessfully',
        data: database
    })
})

// for creating data..

app.post('/create', (req, res) => {
    database.push(req.body);
    res.json({
        message: 'Data created',
        data: database
    })
    console.log(database)
})


//for delete particular data

app.delete('/create/:idx', (req, res) => {
    let { idx } = req.params;

    if (database.length != 0) {
        if (database[idx] == null) {
            res.json({
                message: 'Data Allready deleted',
                data: database
            });
        }
        delete database[idx];
        res.json({
            message: 'Data Deleted !',
            data: database
        });
    } else {
        res.json({
            message: 'Data not available !',
            data: database,

        })
    }
});

// for updating particalr data


app.put('/update/:id', (req, res) => {
    let { val } = req.body;
    let { id } = req.params;

    database[id].title = val;
    res.send({
        message: 'Data updated',
        data: database
    })
})




app.listen(3000, () => {
    console.log('Server runnig on port no 3000')
})