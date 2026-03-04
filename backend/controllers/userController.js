const User = require("../models/User")
const bcrypt =require("bcryptjs")
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.json(users)
    }
    catch (error) {
        res.status(500).json({ message: "Server Error ", error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.name = name || user.name
        user.role = role || user.role
        user.email = email || user.email
        await user.save()
        res.json({ message: "User updated successfully", user })
    }
    catch (error) {
        res.status(500).json({ message: "Server Error ", error: error.message })
    }
}



const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body
        const id = req.params.id
        if (!["admin", "teacher", "student"].includes(role)) {
            return res.status(400).json({ message: "invalid role" })
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.role = role
        await user.save()
        res.json({ message: "User role updated successfully", user })
    }
    catch (error) {
        res.status(500).json({ message: "Server Error ", error: error.message })
    }
}


const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot delete yourself" })
        }
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: "User deleted successfully" })

    }
    catch (error) {
        res.status(500).json({ message: "Server Error ", error: error.message })
    }

}

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "user Already exists" })
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const user = await User.create({
            name, email, password:hashedpassword, role
        })
        res.status(201).json({message:"User created successfully",user})
    
    }
      catch (error) {
        res.status(500).json({ message: "Server Error ", error: error.message })
    }

}

module.exports={
    getAllUsers,
    updateUser,
    updateUserRole,
    deleteUser,
    createUser
}