const express = require("express");
const { register, login, logout, updateProfile } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { singleUpload } = require("../middlewares/multer");

const router = express.Router();


router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, updateProfile);
router.route("/logout").get(logout);

module.exports = { router };  // This is fine
