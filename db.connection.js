const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.DATABASE)
.then((success) => {
    console.log("Database connection Successfull");
})
.catch((error) => {
    console.log("Error while connecting database: ", error);
})