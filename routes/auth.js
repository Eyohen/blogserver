const {register, login, admin_login,  refetchUser} = require('../controllers/auth')

const express=require('express')

const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/adminlogin",admin_login)
router.get("/refetch", refetchUser)


module.exports = router