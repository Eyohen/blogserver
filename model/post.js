const mongoose = require('mongoose')

const PostSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,  
    },  
    subtitle:{
        type:String,
        required:true,  
    },   
    text:{
        type:String,
        required:true,
     
    },
    date:{
        type:String,
        required:true,
      
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
  

},{timestamps:true})


module.exports = mongoose.model("Post", PostSchema)
