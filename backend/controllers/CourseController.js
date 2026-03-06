const Course = require("../models/Course")
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
        const { title, description, price, category, thumbnail } = req.body
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
module.exports={
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollStudent
}