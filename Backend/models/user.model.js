const mongoose =require("mongoose")

const userSchima=new mongoose.Schema({
    fullname:{type:String,
        required:true
    },
    email:{type:String,
           require:true,
           unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student", "recruviter"],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //U;RL to resume file
        resumeOriginalName:{type:String}, 
        company:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }      
        
    }

    
},{timestamps:true})

const User=mongoose.model("user", userSchima)

module.exports={
    User
}