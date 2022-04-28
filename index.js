// Third part module of node js
const express = require("express");
//initialise
const app =express();
//Mongoose-DB
const mongoose = require("mongoose");
//middleware
const morgan= require("morgan");
//cors
const cors =require("cors");

const path =require("path");

const dotnev =require('dotenv');

dotnev.config();

app.use(cors());
app.use(morgan("dev"));
//body parser
app.use(express.json());

//router import

const infoRouter= require("./router");//check if /router/api
app.use("/info",infoRouter);

app.use(express.static(path.join(__dirname, "/suray_app/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/suray_app/build', 'index.html'));
});


app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started");
})

if (process.env.NODE_ENV ==='production'){

    app.use(express.static('suray_app/build'));


}
console.log(process.env.MONGO_URL);

//DB connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlparser:true,useUnifiedTopology:true},(err)=>{
    if(!err)
    {
        console.log("DB connected");

    }   
})