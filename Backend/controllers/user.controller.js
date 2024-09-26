const {User}= require("../models/user.model.js")
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(req.body)
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .send({ message: "Please fill all the fields", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ message: "Email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .send({ message: "Account created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .send({ message: "Please fill all the fields", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Incorrect email or password", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .send({ message: "Incorrect email or password", success: false });
    }
    if (role !== user.role) {
      return res.status(400).send({
        message: "Account doesn't exist with correct role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .send({
        message: `Welcome back" ${user.fullname}`,
        success: true,
        token,
      });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .send({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile=async(req,res)=>{
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file=req.file;
         
    // cloudinary
    let skillsArray;
    if(skills){
      skillsArray=skills.split(",")
    }
   
    const userId= req.id  //middleware auth
    let user =await User.findById(userId)
    if(!user){
        return res.status(404).send({ message: "User not found", success: false });
    }

    //updating date 
    if(fullname)user.fullname=fullname
    if(email)user.email=email
    if(phoneNumber)user.phoneNumber=phoneNumber
    if(bio) user.profile.bio=bio
    if(skills) user.profile.skills=skillsArray
   

    await user.save()
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
        profile: user.profile,
      };
      return res.status(200).send({ message: "Profile updated successfully", success: true, user})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  register,
  login,
  logout,
  updateProfile
};