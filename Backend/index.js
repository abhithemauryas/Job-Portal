const express= require("express")
const cookieParser =require("cookie-parser")
const cors= require("cors")
const {Connection}= require("./Config/db")
const dotenv= require("dotenv")
const userRoutes = require("./routes/user.route.js");
const companyRoute=require("./routes/company.route.js");
const jobRoute = require("./routes/job.route.js");
const applicationRoute= require("./routes/application.route.js")
dotenv.config()


//moddleware
const app = express();
app.use(express.json());
app.use(cookieParser())
const corsOptions={
    origin:"http://localhost:5173",
    CredentialS:true
}
app.use(cors(corsOptions))


app.use("/api/v1/user", userRoutes.router);
app.use("/api/v1/company", companyRoute.router);
app.use("/api/v1/job", jobRoute.router);
app.use("/api/v1/application", applicationRoute.router); 





app.get("/home",(req,res)=>{
    res.status(201).send({"msg":"Hey from backend", status:true})
}) 

app.listen(process.env.port,async()=>{
    await Connection
     console.log("server is running  on port",process.env.port)

     try {
        console.log("db is connected")
     } catch (error) {
       console.log("db is not connected")  
     }
})




