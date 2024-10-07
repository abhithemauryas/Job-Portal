const express =require("express")
const { Job } = require('../models/job.model');
const {Application}=require("../models/application.model")

const router = express.Router();

// Create a new job
const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).send({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).send({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"} },
                {description:{$regex:keyword,$options:"i"} },
            ]
        };
        const jobs =await Job.find(query).populate({
            path:"company",        
        }).sort({created:-1});
        console.log(jobs)
        if(!jobs){
            return res.status(404).send({message:"Jobs not found.",success:false})

        };
        return res.status(200).send({message:"Jobs found successfully.",jobs,success:true})
    } catch (error) {
        console.log(error)
    }
}

const getJobById=async(req,res)=>{
    try {
         const jobId=req.params.id;
         const job=await Job.findById(jobId).populate({
            path:"applications"
         })
         if(!job){
            return res.status(404).send({message:"Job not found.",success:false})
         };
         return res.status(200).send({message:"Job found successfully.",job,success:true})   
    } catch (error) {
      console.log(error)  
    }
 
};


// how many job created by admin
const getAdminJobs=async(req,res)=>{
    try {
        adminId=req.id
        const jobs=await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1
            
        })
        if(!jobs){
            return res.status(404).send({message:"Jobs not found.",success:false})
        };
        return res.status(200).send({message:"Jobs found successfully.",jobs,success:true})
       
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs
}