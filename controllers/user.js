const express=require('express')

const bcrypt=require('bcrypt')
const User = require('../model/user')

const verifyToken = require('../verifyToken')


//UPDATE
const updateUser = async (req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password,salt)
        }
        console.log(req.body)
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
// const deleteUser = async (req,res)=>{
//     try{
//         await User.findByIdAndDelete(req.params.id)
//         await Apartment.deleteMany({userId:req.params.id})
//         await Comment.deleteMany({userId:req.params.id})
//         res.status(200).json("User has been deleted!")

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }





//GET USERS
const getUsers = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const users = await User.find(query.search?searchFilter:null)
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET USER
const getUser = async (req,res) =>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports = {getUser, getUsers, updateUser}