const express = require("express")
const app = express()
const mongoose = require("mongoose")
const env = require("dotenv")

env.config()

mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("successful")}).catch((err)=>{console.log(err)});


app.listen(5000, ()=>{
    console.log("listening on port 5000")
})
