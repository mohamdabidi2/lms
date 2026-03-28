const express=require("express")
const { upload } = require("../services/multer")
const router=express.Router()


router.post("/",upload.single("video"),async(req,res)=>{
    console.log(req.file.filename)
res.json(process.env.BCPROXY+"/uploads/"+req.file.filename)
})
module.exports=router