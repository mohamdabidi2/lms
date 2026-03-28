const mongoose =require('mongoose')
const chapterSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
   } ,
   description:{
    type:String,
    required:true,
    unique:true
   } ,
   videos:[{
   type:mongoose.Schema.Types.ObjectId,ref:"video"
   }]

})
module.exports=mongoose.model("chapter",chapterSchema)