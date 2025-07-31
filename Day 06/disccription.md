# (STEP - 1) 
You have to require all packeges or model

```js
const express = require('express');
const Notes = require('./src/module/notes.module');
const ConnecteToDb = require('./src/db/db');
const app = express();
```

# (STEP - 2 ) 
To read data from database
```js
app.get("/",async (req,res)=>{
    
    res.json({
        message:"Data fetched Successfully",
        data:await Notes.find()
    })
})
```
# (STEP - 3) 
To create data from database
```js
app.post("/create", async (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        {
            let createdData = await Notes.create({ title: title, content: content });
            res.json({
                message: "Success : Data Created",
                data: createdData
            });
        }
    } else {
        res.json({
            message: "Failed : Data Not Created",
            data: "Enter valide data"
        });
    }
});
```
# (STEP - 4) 
To delete data from database
```js
app.delete("/create/:id", async (req,res)=>{
    let {id} = req.params;
    if(id){
        await Notes.deleteOne({_id:id});
        res.json({
            message:"Success : Data deleted"
        })
    }else{
        res.json({
            message:"Failed : Data not Deleted"
        })
    }
})
```
# (STEP - 5) 
To update data from database
```js
app.patch("/create/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!id || !title) {
            return res.status(400).json({ message: "Failed: Missing ID or title" });
        }

        const updatedNote = await Notes.findOneAndUpdate(
            { _id: id },
            { title },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Success: Data updated", data: updatedNote });
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
});
```