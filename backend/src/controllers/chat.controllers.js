import User from "../models/userModel.js";
import  Chat  from "../models/chatodel.js";
 const accessChat =async(req,res,next)=>{
    const {userId} =req.body
    if(!userId){
        console.log("UserId param not sent with request")
        return res.sendStatus(400)
    }
    var IsChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {
                users:{$elemMatch:{$eq: req.user._id}}
            },
            {
                users:{$elemMatch:{$eq:userId}}
            }
        ]
    }).populate("users","-password").populate("latestMessage");
    var isChat = await Chat.populate(IsChat, {
        path: "latestMessage.sender",
        select: "name pic email"
      });
      //"latestMessage.sender" as inside latestmessage sender is still is object Id so we replace it with this field
      /* we can also use 
Chat.find(...)
  .populate("users", "-password")
  .populate({
    path: "latestMessage",
    populate: {
      path: "sender",
      select: "name pic email"
    }
  });
***
from where pic,email comes from
There’s a field called latestMessage, which refers to a Message document.
And inside that message, there's a sender, which refers to a User document
      */
    if(isChat.length>0){
        res.send(isChat[0])
    }
    else{
        var chatdata ={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        }
        try {
            const createdChat = await Chat.create(chatdata)
            const FullChat =await Chat.findOne({_id:createdChat._id}).populate("users","-password")
            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.mesage);
            
        }
    }
 }
 const fetchChat =async(req,res,next)=>{
    const chat = await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt:-1});

var result =await Chat.populate(chat,{
    path:"latestMessage.sender",
    select:"name pic email",
})
    return res.status(200).json({result,message:"chat fetched successfully"})
 }
 //35
 const createGroupChat =async(req,res,next)=>{
 if(!req.body.users|| !req.body.name){
    return res.status(400).json({message:"Please Fill all the fields"})

 }
 //JSON.parse used as multiple data in an array so will send an array in string format and parse it here 
 var users = JSON.parse(req.body.users)
 if(users.length<2){
    return res.status(400).json({message:"more than 2 user are required in a group"})
 }
 users.push(req.user)
 const groupChat =await Chat.create({
    chatName:req.body.name,
    users,
    isGroupChat:true,
    groupAdmin:req.user,
 })
 if(!groupChat){
    return res.status(400).json({message:"group chat not created successfully"})
 }
 const fullGroupChat =await Chat.find({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");
 return res.status(200).json({fullGroupChat})
 }
 const renameGroupChat =async(req,res,next)=>{
 const {chatId,chatName} = req.body
  const updatedCht =await Chat.findByIdAndUpdate(chatId,{
    chatName
  },{
    new:true,
  }).populate("users","-password").populate("groupAdmin","-password")
  if(!updatedCht){
throw new Error("chat not found")
  }else{
    return res.json(updatedCht)
  }
 }
 const addToGroup =async(req,res,next)=>{
 const {chatId,userId} =req.body
 const added =await Chat.findByIdAndUpdate(chatId,{
    $push:{users:userId}
 },{
    new:true
 }).populate("users","-password").populate("groupAdmin","-password")

if(!added){
throw new Error("chat not found")
  }else{
    return res.json(addedt)
  }
 }
 const removeFromGroup =async(req,res,next)=>{
 const {chatId,userId} =req.body
 const remove =await Chat.findByIdAndUpdate(chatId,{
    $pull:{users:userId}
 },{
    new:true
 }).populate("users","-password").populate("groupAdmin","-password")

if(!remove){
throw new Error("chat not found")
  }else{
    return res.json(remove)
  }
 }
 export {
    accessChat,
    fetchChat,
 createGroupChat,
 renameGroupChat,
 addToGroup,
 removeFromGroup
 }