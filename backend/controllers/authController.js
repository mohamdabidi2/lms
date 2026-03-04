const User=require("../models/User")
const bcrypt =require("bcryptjs")
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const userExists=await User.findOne({email})
    if(userExists){
        return res.status(400).json({ok:false,message:"User already exists"})
    }
   
    const hashedpassword=await bcrypt.hash(password,10)
    const user=await User.create({name,email,password:hashedpassword})
    res.status(201).json({ok:true,user,message:"user registred successfully"})
    }
    catch(error){
        res.status(500).json({ok:false,message :error.message})
    }
}



exports.login=async(req,res)=>{
    try{
         const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
               return res.status(404).json({ok:false,message:"invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
                return res.status(400).json({ok:false,message:"wrong password"})
        }
        const token=jwt.sign(
           { id:user._id,user:{role:user.role,name:user.name}},process.env.JWTsecret,{expiresIn:"7d"}
        )
        res.json({token,user:{name:user.name,id:user._id,email:user.email,role:user.role},ok:true})
    }
    catch(error){
        res.status(500).json({ok:false,message :error.message})
    }
}