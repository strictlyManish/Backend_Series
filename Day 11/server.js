const app = require("./src/app");
const Home_Route = require("./src/routes/index.routes");


app.use((req,res,next)=>{
    console.log("costume middlwware runnig b/w index route and api");
    next()
})


app.get("/",Home_Route)

app.listen(3000,()=>{
    console.log("server runnig on port 30000")
})