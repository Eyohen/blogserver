const {getUser, getUsers, updateUser} = require('../controllers/user')
const verifyToken = require('../verifyToken')
const express=require('express')
const router = express.Router()


router.get("/:id", getUser)
router.put("/:id", updateUser)

router.get("/",getUsers)



module.exports = router