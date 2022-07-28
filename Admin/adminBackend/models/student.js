const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: false
        
    },
    studentName: {
        type: String,
        required: false
    }, 
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }, 
    studentStatus: {
        type: String,
        required: true,
        default:'Y'
    },
    
}, {
    timestamps:true
});


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;