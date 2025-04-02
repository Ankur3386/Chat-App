import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
},{timestamps:true})
userSchema.pre("save", async function (){
    if(!this.isModified("password")) return next();
    return await bcrypt.hash(this.password,10)
})
export const User =mongoose.model("User",userSchema)