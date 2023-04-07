require('dotenv').config()



const mongoose = require("mongoose");
const uri = process.env.MONGO_URI

mongoose.set("strictQuery", false);



mongoose.connect(uri).then(() => {
    console.log("Connection successfull with Databse");
}).catch((e) => {
    console.log(e);
})