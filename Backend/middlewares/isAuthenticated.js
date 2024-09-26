const jwt= require("jsonwebtoken")

const isAuthenticated= async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).send({message:"User is not Authenticated",success:false})
        }
        const decode =await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).send({message:"Invalid token", success:false})
        }
        req.id=decode.userId;
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Authentication failed", success: false });
    }
}


module.exports={
    isAuthenticated
}