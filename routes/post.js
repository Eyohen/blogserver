const {createPost, getPost, getPosts,updatePost} = require('../controllers/post')

const express=require('express')

const router = express.Router()


router.post("/create", createPost)
router.get("/", getPosts)
router.get("/:id", getPost)
router.put("/:id", updatePost)


module.exports = router