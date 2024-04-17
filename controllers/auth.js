const User = require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



//REGISTER
const register = async (req,res) => {
    try{

        const {firstName,lastName,email,role,password}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hashSync(password,salt)
        const newUser = new User({firstName,lastName,email,role,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)
 
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}


// ADMIN LOGIN
const admin_login = async (req,res) => {

    try{
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }
        if(user.role !== "admin"){
            return res.status(401).json({message: "Not Admin"})
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        
        const token = jwt.sign({_id:user._id,email:user.email, role:user.role},process.env.SECRET,{expiresIn:"14d"})
        const {password,...info} = user._doc
        res.status(200).json({...info,access_token: token})

    }
    catch(err){
        res.status(500).json(err)
    }
}


//LOGIN
const login = async (req,res) => {

    try{
        const user = await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(401).json({message:"Invalid Email or password"})
        }

        // if(!user.verified){
        //     return res.status(401).json({message:"Invalid Email or password"})
        // }
        
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }

     
        
        const token = jwt.sign({_id:user._id,email:user.email, role:user.role},process.env.SECRET,{expiresIn:"14d"})
        const {password,...info} = user._doc
        res.status(200).json({...info,access_token: token})

    }
    catch(err){
        res.status(500).json(err)
    }
}

// refetch user
const refetchUser = async(req, res) => {
    // extract the token from the authorization header 
    const token  = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: "Unauthorized - Missing token"});
    }

    try {
        // verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        //At this point, you have the decoded user information (decoded)
        res.status(200).json({...decoded,access_token: token});
    } catch(err){
        res.status(401).json({error: "Unauthorized - Invalid token"})
    }
}





module.exports = {register, admin_login, login, refetchUser }