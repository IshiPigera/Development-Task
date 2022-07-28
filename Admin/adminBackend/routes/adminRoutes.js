const express = require('express')
const router = express.Router()
const AdminLogin = require('../controller/adminController')
const { postStudentRegistration  ,validateEmail, getAllStudent, deleteStudent} = require('../controller/studentController')

const { postUser, getUser, getATempUser } = require('../controller/tempUserController')
 
/*Login */
router.post("/login", AdminLogin)

/*Create user routes */

router.post("/user/create", postUser)
router.get("/user/get", getUser)
router.get("/user/get/:id", getATempUser)
router.post("/user/find", validateEmail)

/*Student registration */

router.post("/studentRegister/post", postStudentRegistration);
router.get("/studentRegister/get", getAllStudent)
router.delete("/studentRegister/delete/:id", deleteStudent)
 
 

module.exports = router

