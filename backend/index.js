require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL ;

app.listen(3002 , (req , res)=>{
    console.log("Server Started")
    mongoose.connect(url);
    console.log("Database Connected");
})