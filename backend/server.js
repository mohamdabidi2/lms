require("dotenv").config()
const express=require ('express')
const cors=require('cors')
const mongoose=require("mongoose")
const authRoutes=require ("./routers/authRoutes")
const userRoutes=require ("./routers/UserRoutes")
const CourseRoutes=require ("./routers/CourseRoutes")
const VDupload=require ("./routers/videoUpload")
const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        console.log("MongoDB connected")
    }
).catch((err)=>{
console.error("DataBase connection error",err.message)
})
app.get('/',()=>{console.log("test")})
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/courses",CourseRoutes)
app.use("/api/upload",VDupload)
app.listen(5000,()=>{
    console.log("server is running at 5000")
})