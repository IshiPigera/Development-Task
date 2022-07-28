const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    userStatus:{
        type:String,
        required:true,
        trim:true,
        default:"Y"
    }
    
});

const tempUser = mongoose.model("TempUser",userSchema)

module.exports = tempUser