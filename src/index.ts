import express from "express";
import { userModel, contentModel, tagModel , linkModel } from "./db";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import cors from "cors";

const app = express();

app.use(express.json());   //automatically convert incoming data to javascript object
app.use(cors());

app.post("/api/v1/signup",async(req, res)=>{
    
})



app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})