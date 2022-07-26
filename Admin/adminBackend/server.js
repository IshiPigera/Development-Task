const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); //data sent to the server in json format. Server can't understand that format.
//To convert it to js object format, we need body parser
require("dotenv").config();

const app = express();

//import routes
const adminRoutes = require("./routes/adminRoutes");

//app middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true

   }).then(()=>{
    console.log("MongoDB is connected successfully");
}).catch((err) =>{
    console.log("DB connection error", err);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})