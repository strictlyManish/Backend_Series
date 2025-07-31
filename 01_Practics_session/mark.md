# For Creating data

```js
app.post('/data',(req,res)=>{
    database.push(req.body);
    res.json({               
        message:'Data Saved : Sucessfully',
        userdata : req.body
    })
});

```

# For deleting <br>for particular data.

```js

app.delete('/data/:idx',(req,res)=>{
    let {idx} = req.params;
    if(idx){
        delete database[idx]
       res.json({                                
        message:'Data deleted : Sucessfully',
        userdata : database
    })
    }else{
        res.json({
            message:"can't deleted : Error",
            userdata:database
        });
    }
});
```


# For updating particular data or Edit 

```js
app.put('/data/:idx',(req,res)=>{
    let {idx} = req.params;
    let {update} = req.body;

    if(idx && update){
        database[idx].title = update;
        res.json({
            message:'Data updated : Sucessfull',
            userdata:database
        })
    }else{
        res.send('Somthig is brok !')
    }
})
```

