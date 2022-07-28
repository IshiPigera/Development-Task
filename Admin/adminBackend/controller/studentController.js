const studentRegistration = require('../models/student');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/*Post Student registration */

const postStudentRegistration = async (req, res) => {
    try{
        const {studentId, studentName, email, gender, password} = req.body;
        const student  = await studentRegistration.findOne({email:email})
        if(student) {
            return res.status(400).json({message: "The email already exists"})
        }
        const passwordEncrypt = await bcrypt.hash(password, 10)
        const newRegister = new studentRegistration({
            studentId: studentId,
            studentName:studentName,
            email:email,
            gender:gender,
            password:passwordEncrypt
        })
        await newRegister.save()
        res.json({message:"Successfully registered"}
        )
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}

/*Get all register Student */

const getAllStudent = async(req,res)=>{
    studentRegistration.find().exec((err,students)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingStudents:students
        });
    });
}

//delete user
const deleteStudent = async(req,res)=>{
    studentRegistration.findByIdAndRemove(req.params.id).exec((err,deletedStudent)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Student something is wrong!",deletedStudent
            });
        }
        return res.status(200).json({
            success:"Student removed successfully!",deletedStudent
        });
    });
};
 

//Find any user with same Email
const validateEmail=async(req,res)=>{
    let{ email} = req.body
    studentRegistration.findOne({email:email},(err,tempUser)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            tempUser
        });
    });

}

module.exports = {
    postStudentRegistration,
    getAllStudent,
    deleteStudent,
    validateEmail
}