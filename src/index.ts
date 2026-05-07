import express from "express";
import { userModel, contentModel, tagModel , linkModel, connectdb } from "./db";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import cors from "cors";
import { z } from "zod";
import bcrypt from "bcrypt";

connectdb();


const app = express();

app.use(express.json());   //automatically convert incoming data to javascript object
app.use(cors());  // by defaut allowed all origins

const signupschema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
})

app.post("/api/v1/signup",async(req, res)=>{

    console.log("🔥 Signup route hit");
    console.log("BODY:", req.body);
    
    const result = signupschema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:"Invalid Input"
        })
    }

    const {username, password} = result.data;

    try{
        const existingUser = await userModel.findOne({username});

        if(existingUser){
            return res.status(409).json({
                message:"User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10); //uses blowfish cipher algo and 10 means how much time salting is done

        const newuser=new userModel({
            username,
            password: hashedPassword
        })

        await newuser.save();
        
        return res.status(201).json({
            message:"User created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            message:"serer error"
        })
    }
})



app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})