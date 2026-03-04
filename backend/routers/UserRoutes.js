const express=require("express")
const router=express.Router()

const {protect,admin}=require("../middelware/PortectedRoutesMiddelware")
const{
    getAllUsers,
    updateUser,
    updateUserRole,
    deleteUser,
    createUser
} =require("../controllers/userController")

router.get("/",protect,admin,getAllUsers)
router.post("/",protect,admin,createUser)
router.put("/:id",protect,admin,updateUser)
router.put("/:id/role",protect,admin,updateUserRole)
router.delete("/:id",protect,admin,deleteUser)
module.exports=router
