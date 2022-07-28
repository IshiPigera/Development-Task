const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
}, {
    timestamps:true
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;