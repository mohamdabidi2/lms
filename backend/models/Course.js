const mongoose = require('mongoose')
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,

    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    price: {
        type: Number,
        default: 0
    },
    category:{
        type: String,
        default: ""
    },

    thumbnail: {
        type: String,
         default: ""
    }

})
module.exports = mongoose.model("Course", CourseSchema)