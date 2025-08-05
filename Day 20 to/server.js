const app = require("./src/app");



app.get("/",(req,res)=>{
    res.send("HELLO EXPRESS.")
})

app.listen(3000,()=>{
    console.log("Server runnig on port 3000")
});