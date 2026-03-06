const express = require("express")
const router = express.Router()
const {protect,teacherORAdmin}=require("../middelware/PortectedRoutesMiddelware")

const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollStudent
} = require('../controllers/CourseController')
router.get("/",protect,teacherORAdmin,getAllCourses)
router.get("/:id",protect,teacherORAdmin,getCourseById)
router.post("/",protect,teacherORAdmin,createCourse)
router.put("/:id",protect,teacherORAdmin,updateCourse)
router.delete("/:id",protect,teacherORAdmin,deleteCourse)
router.post("/:id/enroll",protect,enrollStudent)
module.exports=router
