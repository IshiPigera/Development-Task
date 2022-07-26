const express = require('express')
const router = express.Router()
const AdminLogin = require('../controller/adminController')

const { postUser, getUser, getATempUser} = require('../controller/tempUserController')
 
/*Login */
router.post("/login", AdminLogin)

/*Create user routes */

router.post("/user/create", postUser)
router.get("/user/get", getUser)
router.get("/user/get/:id", getATempUser)

module.exports = router

