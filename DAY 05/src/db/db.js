const mangoose = require('mongoose');

const ConectetoDb = () =>{
    mangoose.connect("mongodb+srv://manishraz800:zpBODxtB5Th43aLO@cluster0.q9qavsc.mongodb.net/cohort")
    .then(()=>{
        console.log('Database concted !')
    })
};


module.exports = ConectetoDb