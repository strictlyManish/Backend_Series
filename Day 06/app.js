const express = require("express");
const connectToDb = require("./src/db/db");
const user = require("./src/module/user.module");
const app = express();
app.use(express.json());

app.post("/user", async (req, res) => {
    let { name, username, disc } = req.body;
    if (name && username && disc) {
        let created_userProfile = await user.create({
            name: name,
            username: username,
            disc: disc
        });
        res.json({
            message: "Data created successfully",
            data: created_userProfile
        })
    } else {
        res.json({
            message: "Data created successfully",
            data: []
        })
    }


});

app.get("/", async (req, res) => {
    let userData = await user.find()
    res.json({
        message: "Data fetched successfully",
        data: userData
    })
})

app.patch("/user/:id", async (req, res) => {
    let { id } = req.params;
    let { name, username, disc } = req.body;
    if (name || username || disc) {
        const updatedFields = {};

        if (name) updatedFields.name = name;
        if (username) updatedFields.username = username;
        if (disc) updatedFields.disc = disc;

        await user.updateOne({ _id: id }, { $set: updatedFields });

        res.json({
            message: "Success: Data updated"
        });
    } else {
        res.json({
            message: "Failed: Data not updated"
        });
    }

})

app.delete("/user/:id", async (req,res)=>{
    let {id} = req.params;
    if(id){
        let delteduser = await user.deleteOne({_id:id})
        res.json({
            message: "Success: data deleted",
           
        });
    }else{
      res.json({
            message: "Failure :  data deleted",
        });  
    }
})


connectToDb();
app.listen(8000, () => {
    console.log("Server runnig on port : 8000")
})