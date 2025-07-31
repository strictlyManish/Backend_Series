const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.json({
        message:"Its a Home page"
    });
});


module.exports = router;