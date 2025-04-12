
import auth from '../middlewares/auth.middleware.js';
import User from '../models/userModel.js'
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
      return res.status(400).json({ message: "Please upload all credentials" });
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
      return res.status(400).json({ message: "User Already Exists" });
  }
//   if (!req.file) {  // Check if an image was uploaded
//     return res.status(400).json({ message: "Profile image is required." });
// }
console.log(req.file)
  let imageUrl = null;
  

  if (req.file) {
      // Upload image to Cloudinary
      const localFilePath = req.file.path;
      try {
          const uploadResult = await uploadOnCloudinary(localFilePath);
          console.log("Cloudinary Upload Result:", uploadResult);

          if (uploadResult && uploadResult.url) {
              imageUrl = uploadResult.url;
          }
      } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return res.status(500).json({ message: "Image upload failed" });
      }
  }

  // If image is required, ensure it's not null
//   if (!imageUrl) {
//       return res.status(400).json({ message: "Image is required" });
//   }

  // Create new user
  const user = await User.create({
      name,
      password, // Ensure your User model hashes this password
      email,
      image: imageUrl
  });

  if (!user) {
      return res.status(500).json({ message: "Error creating user" });
  }

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
      return res.status(500).json({ message: "Error fetching user" });
  }

  const token = createdUser.generatetoken(createdUser._id);
  res.status(201).json({
      createdUser,
      token,
      message: "User created successfully"
  });
};

const loginUser =async(req,res,next)=>{
    const {email,password}= req.body
    if(!email||!password){
        throw new Error ("please upload all credientials")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new Error ("user doesnot exist")
    }
    const correcttPassword = await user.isPasswordCorrect(password)
if(!correcttPassword){
    throw new Error ("password is incoorect")
}

const token = user.generatetoken(user._id)
res.status(201)
.json({user,
    token,message:"user logged in  successfully"})
}
//   /api/user?serach =piyush
/*
$regex: req.query.search, $options: "i"
Used for partial, case-insensitive search.
Matches any field that contains the search string (e.g. "john" matches "Johnny", "myJohn", etc.).
 Why use it?
For flexible search experiences (like search bars).
User doesn’t need exact spelling or case.
Other methods:
Exact Match use
{ name: req.query.search }
Only returns exact matches (case-sensitive).

Full-Text Search
{ $text: { $search: req.query.search } }
More powerful, ranked results.

Requires text index in MongoDB.

Regex Risks
Regex can be slow or abused if not careful.
Sanitize inputs or limit input length.
Use Case	                  Best Method
Simple partial search	      $regex + i
Exact value match	          Direct match
Smart ranked search	            $text search

*/ 
const allUsers =async(req,res,next)=>{
const keyword =req.query.search?{
  $or:[
    {
        name:{$regex:req.query.search,$options:"i"}
    },
    {email:{$regex:req.query.search,$options:"i"}},

  ]  
}:{};
console.log(req.user,"Hello");
//The keyword is being treated as a field name rather than the query object  so use ...keyword rather than keyword so due to it we will be able to use s and it will name starting with s except the logged in user 
const user =await User.find({...keyword,_id:{$ne:req.user._id}});
res.send(user);

}




export  {registerUser ,
loginUser,allUsers}