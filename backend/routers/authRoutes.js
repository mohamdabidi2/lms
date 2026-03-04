const express=require("express")
const router=express.Router()
const {protect,admin}=require("../middelware/PortectedRoutesMiddelware")
const {login,register} =require ("../controllers/authController")
router.post("/register",register)
router.post("/login",login)
router.get("/test",protect,admin,(req,res)=>{
    res.send(req.user)
})

module.exports=router