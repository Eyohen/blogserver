const express = require('express')

const Post = require('../model/post')
// const User = require('../model/user')
const bcrypt=require('bcrypt')
const verifyToken = require('../verifyToken')



 // CREATE Post
const createPost = async (req,res)=>{
    try{
        // const user = await User.findById(req.userId);
        // console.log(user)
        // if (!user) throw new Error('User not found');

        // const newPost = new Post({...req.body, user:user._id})
        const newPost = new Post(req.body)

        // console.log(req.body)
        const savedPost = await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Post not created"})
    }    
}


//UPDATE
const updatePost = async (req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password,salt)
        }
        console.log(req.body)
        const post = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(post)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deletePost = async (req,res)=>{
    try{
        // Check if the authenticated user has the required role (isAdmin middleware already applied)
    // if (req.user.role !== "admin") {
    //     console.log(req.user.role)
    //     return res.status(403).json({ message: 'Permission denied. Admin access required.' });
        
      
    //   }

      await Post.findByIdAndDelete(req.params.id)
    
      res.status(200).json("Post has been deleted!")


      

    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET USERS
const getPosts = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const post = await Post.find(query.search?searchFilter:null).populate('user')
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET USER
// const getPost = async (req,res)=>{
//     try{
//         const user=await Post.findById(req.params.id)
//         const {password,...info}=user._doc
//         res.status(200).json(info)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }

const getPost = async (req,res)=>{
 
    try{
        const post = await Post.findById(req.params.id).populate('user')
        res.status(200).json(post) 
    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports= {createPost, getPost, getPosts, deletePost, updatePost}