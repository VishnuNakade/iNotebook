const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

//CODE FOR .env include
// const dotenv = require('dotenv')
// dotenv.config({path:__dirname+'/.env'});

const MONGOURI ="mongodb://127.0.0.1:27017/iNotebook?directConnection=true"
// const MONGOURI = process.env.MONGOURI

const connectToMongo = async() => {
    mongoose.connect(MONGOURI, () => {
        console.log("Connected to Mongoos Successfully");
    })
}
module.exports = connectToMongo;

