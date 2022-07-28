const studentRegistration = require('../models/student');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/*Post Student registration */

const postStudentRegistration = async (req, res) => {
    try {
        const { studentId, studentName, email, gender, password } = req.body;
        const student = await studentRegistration.findOne({ email: email })
        if (student) {
            return res.status(400).json({ message: "The email already exists" })
        }
        const passwordEncrypt = await bcrypt.hash(password, 10)
        const newRegister = new studentRegistration({
            studentId: studentId,
            studentName: studentName,
            email: email,
            gender: gender,
            password: passwordEncrypt
        })
        await newRegister.save()
        res.json({ message: "Successfully registered" }
        )
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

/*Get all register Student */

const getAllStudent = async (req, res) => {
    try {
        const studentData = await studentRegistration.find()
        return res.status(200).send({
            status: "200",
            data: studentData
        })
    } catch (err) {
        return res.status(500).send({
            status: "500",
            err: err
        })
    }
}

/*Update student */

const updateStudent = async (req, res) => {
    const data = req.body

    const passwordEncrypt = await bcrypt.hash(data.password, 10)

    const updateData = {
    "studentId": data.studentId,
    "studentName": data.studentName,
    "email": data.email,
    "gender": data.gender,
    "password": passwordEncrypt,
    "studentStatus": data.studentStatus
}
    console.log("xxxxxxx",updateData)

    studentRegistration.findByIdAndUpdate(
      
        req.params.id,
        {
            $set: updateData
        },

    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "user updated" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with updating data" });

    })
}

/*get one student user */

const getOneStudentUser = async (req, res) => {

    const { studentUser } = req.body;


    studentRegistration.findOne({ studentId: studentUser }, (err, user) => {
        try {

            if (user) {

                return res.status(200).json({ message: "student Data fetch", data: user })

            } else {

                return res.status(400).json({ error: "No Data", data: user })
            }




        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error" });
        }



    });


}

/* student login */
const StudentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await studentRegistration.findOne({ email: email })
        if (!user) {
            return res.status(200).json({ message: "User Not registered.", state: false })
        }

        const matched = await bcrypt.compare(password, user.password)
        if (!matched) {
            return res.status(200).json({ message: "Password is incorrect", state: false })
        }
     
        const load = { id: user._id, name: user.studentName }
        const token = jwt.sign(load, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        
        const userStatus = user.studentStatus
        return res.status(200).json({ message: "Login succsess", state: true, token: token, userState: user })

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }


}

/* student token */
const StudentToken = async (req, res) => {
    try {
        const token = req.header("Auth")
        if (!token) {
            return res.send(false)
        }
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, verify) => {
            if (err) {
                return res.send(false)
            }

            const user = await studentRegistration.findById(verify.id)
            if (!user) {
                return res.send(false)
            }

            return res.send(true)

        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// update student status
const updateStudentStatus = async (req,res) => {

try{

    const { email } = req.body;
    const user = await studentRegistration.findOne({ email: email });

    studentRegistration.findByIdAndUpdate(
        user._id,
        {
            studentStatus:'N'
        },

    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "user updated" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with updating data" });

    })



}catch(err){

}

}

module.exports = {
    postStudentRegistration,
    getAllStudent,
    updateStudent,
    getOneStudentUser,
    StudentLogin,
    StudentToken,
    updateStudentStatus
}