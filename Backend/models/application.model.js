const mongoose= require("mongoose")
const applicationSchema= new mongoose.Schema({
       job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
       } ,
       applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

       } ,
       status:{
        type:String,
        enm:["pending", "accepted","rejected"],
        ref:"Job",
        required:true,
         default:'pending'

       },
},{timestamps:true})

const Application= mongoose.model("Application", applicationSchema)

module.exports={
    Application
}