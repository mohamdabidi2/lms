const Chapter = require("../models/chapter")
const Course = require("../models/Course")
const Video = require("../models/Video")
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email')
            .populate('Students', 'name email')
        if (!course) {
            return res.status(404).json({ message: 'Course not Found' })
        }
        res.json(course)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
const createCourse = async (req, res) => {
    try {
        const { title, description, price, category } = req.body
let thumbnail="/uploads/"+req.file.filename

console.log(req.file.mimetype)
        const course = await Course.create({
            title,
            description,
            price,
            category,
            thumbnail,
            instructor: req.user._id
        })
        res.status(201).json({ message: "Course created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            return res.status(404).json({ message: 'Course not Found' })
        }
        if (req.user.role !== "admin" && course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this course" })
        }
        const updateCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "course updated successfully", course: updateCourse }

        )
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            return res.status(404).json({ message: 'Course not Found' })
        }
        if (req.user.role !== "admin" && course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this course" })
        }
        await Course.findByIdAndDelete(req.params.id)
        res.json({ message: "course deleted successfully" })

    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
const enrollStudent = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            return res.status(404).json({ message: 'Course not Found' })
        }
        if(course.Students.includes(req.user._id)){
            return res.status(400).json({message:"Already Enrolled"})
        }
        course.Students.push(req.user._id)
        await course.save()
        res.json({message:"Enrolled successfully",course})
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}



// ADD NEW CHAPTER
const AddChapter =async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            return res.status(404).json({ message: 'Course not Found' })
        }

        const {title,description}=req.body

        const chapter =await Chapter.create(title,description)
      
        course.chapters.push(chapter)
          await chapter.save()
        await course.save()
      
        res.json({message:"Chapter added successfully",course})
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
// ADD NEW VIDEO TO A COURSE 
const AddVideo =async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            return res.status(404).json({ message: 'Course not Found' })
        }
        const chaptre = await Chapter.findById(req.params.Chapterid)
        if (!course) {
            return res.status(404).json({ message: 'chapter not Found' })
        }

        const {title,description}=req.body
        const url=req.file.filename
        const instructor=req.user._id
        const video=await Video.create({
title,description,url,instructor
        })
      
        course.chapters.find(el=>el._id=req.params.Chapterid).videos.push(videos)
        await video.save()
        await course.save()
        res.json({message:"video added successfully",course})
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

module.exports={
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollStudent
}