const mongoose = require('mongoose')
const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,

    },
    duration: {
        type: Number,
        required: true,

    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Comments: [{
        Userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
        message: { type: String },
        likes: { type: Number },
        replys: [],
        image: { type: String }

    }],

})
module.exports = mongoose.model("Video", VideoSchema)