const express =require("express");
const { Application } = require("../models/application.model");
const { Job } = require("../models/job.model");

const applyJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).send({message:"Job id is required",success:false});
        }
        const existingApplication=await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication){
            return res.status(400).send({message:"You have been already applied for this job",success:false});

        }
        const job =await Job.findById(jobId);
        if(!job){
            return res.status(404).send({message:"Job not found",success:false});  
        }
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id)
        await job.save()
        return res.status(201).send({message:"Application submitted successfully",success:true});
    } catch (error) {
        console.log(error)
        
        
    }
}
const getAppliedJobs=async(req,res)=>{
    try {
        const  userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(404).send({message:"No jobs applied",success:false});
        }
        return res.status(200).send({message:"Jobs applied successfully",success:true,application});

    } catch (error) {
      console.log(error)  
    }
}
const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })
        if(!job){
            return res.status(404).send({message:"Job not found",success:false});
        };
        return res.status(200).send({message:"Applicants found successfully",success:true,job})

    } catch (error) {
        console.log(error)
    }
}
const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).send({message:"Status is required",success:false});
        }
        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).send({message:"Application not found",success:false});
        }
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).send({message:"Status updated successfully",success:true,application})
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus

}