const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log("DB connection successfull");
    })
    .catch((err)=> {
        console.log("DB connection unsuccessfull");
        console.error(err);
        process.exit(1);
    })
}

module.exports = {dbConnect};