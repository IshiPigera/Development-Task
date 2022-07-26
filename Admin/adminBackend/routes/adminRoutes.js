const express = require('express')
const router = express.Router()
const AdminLogin = require('../controller/adminController')

 
 
/*Login */
router.post("/login", AdminLogin)

 

module.exports = router

