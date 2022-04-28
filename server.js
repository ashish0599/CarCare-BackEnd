 require("dotenv").config();
const cors = require ("cors")
const express = require ("express");
const app = express()

const PORT = process.env.PORT || 5000;
const db = require ("./mongoDB")
const jwt = require("jsonwebtoken");

const loginRoutes = require("./routes/user_routes")
const verifyEmail = require("./routes/verifyMail_route")
const resetPass = require("./routes/forgetpassRoutes")
const appointRoute = require("./routes/appointRoute")

async function server(){

    app.use(cors())
    app.use(express.json())
     await db.connect()

    app.use("/user" , loginRoutes)
    app.use("/verify" ,  verifyEmail)
    app.use("/" , resetPass)
 
 // middleware
    app.use((req , res, next)=>{
        const token = req.headers ["auth-token"];

         if(token){
         req.user = jwt.verify(token , "admin123")
          next()}
      else{res.sendStatus(401)}

    })
    app.use("/" , appointRoute)
      app.listen(PORT , ()=>{
        console.log("Server Started at" + PORT)
    })
}

server()
