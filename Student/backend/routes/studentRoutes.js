const express = require('express')
const router = express.Router()

const { postStudentRegistration, getAllStudent, updateStudent, getOneStudentUser, StudentLogin, StudentToken , updateStudentStatus} = require('../controller/studentController')
 
const { postNotes, getNote, getANote, updateNote, deleteNote} = require('../controller/noteController')

const { validateLogin } = require('../controller/tempUserController')

const auth = require("./auth")

/*Student registration */

router.post("/studentRegister/post", postStudentRegistration);
router.get("/studentRegister/get", getAllStudent);
router.put("/studentRegister/update/:id", updateStudent);
router.post("/studentRegister/getuser", getOneStudentUser);
router.post("/studentRegister/login", StudentLogin);
router.post("/studentRegister/updatestate", updateStudentStatus);

/*Token verification */
router.get("/tokenVerify", StudentToken)

/*Notes */

router.post("/note/post", auth, postNotes);
router.get("/note/get", auth, getNote);
router.put("/note/update/:id", auth, updateNote);
router.get("/note/getnote/:id", auth, getANote);
router.delete("/note/delete/:id", auth, deleteNote);


// temp user login routes
router.post("/tempLogin/post", validateLogin);



module.exports = router

