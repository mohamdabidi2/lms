const jwt=require("jsonwebtoken")

const User=require("../models/User")

exports.protect=async (req,res,next)=>{
let token
if(req.headers.authorization.startsWith("Bearer")){
    token=req.headers.authorization.split(" ")[1]
    try{
        const decoded=jwt.verify(token,process.env.JWTsecret)
        req.user=await User.findById(decoded.id).select("-password")
        next()
    }
    catch(error){
        res.status(401).json({message:"Not Authorized, token failed"})
    }
}
if(!token){
        res.status(401).json({message:"Not Authorized, no token"})
    
}
}

exports.admin=async (req,res,next)=>{
    if(req.user&& req.user.role==="admin"){
        next()
    }
    else{
        res.status(403).json({message:"Admin access only"})
    }
}
exports.teacher=async (req,res,next)=>{
    if(req.user&& req.user.role==="teacher"){
        next()
    }
    else{
        res.status(403).json({message:"teacher access only"})
    }
}
exports.teacherORAdmin=async (req,res,next)=>{
    if(req.user&& (req.user.role==="teacher"||req.user.role==="admin")){
        next()
    }
    else{
        res.status(403).json({message:"Authorized access only"})
    }
}