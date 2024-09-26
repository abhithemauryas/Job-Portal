const express = require("express");
const {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs
} = require("../controllers/job.controller.js");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);

module.exports = { router };  // This is fine
