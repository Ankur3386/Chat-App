import mongoose from "mongoose";
import User from '../models/userModel'
import uploadOnCloudinary from "../utils/cloudinary";
const registerUser =async(req,res,next)=>{
    //take data
    //check if user exist 
    //hash password
    //pic on cloudinaary
    //creste new password
    //check if user created
    //send user
    const {name,password,email,pic} =req.body;
if(!name||!password||!email){
    throw new Error ("please upload all credientials")
}

const existedUser = await User.findOne({email})
if(existedUser){
    throw new Error ("User Allready Existed")
}

if(pic){
  const localFilePath = req.file?.pic[0].path
    const pic = await uploadOnCloudinary( localFilePath)
}
const user = await User.create({
    name,
    password,
    email,
    image:pic
})
if(!user){
    throw new Error ("Error creating user")
}
const createdUser =await User.findById(user._id)
if(!createdUser){
    throw new Error ("Error fetching  user")
}
res.status(201).json({user,message:"user created successfully"})
}