const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../backend/configs/db")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


userRouter.post("/register",async(req,res)=>{
    // 1st const payload=req.body
    const {name,email,pass,age}=req.body
     try{
        bcrypt.hash(pass, 8, async (err, hash)=>{
        const user=new UserModel({name,email,pass:hash,age})
        await user.save()
        res.send("Registered")
    });
    }catch(err){
        es.send("Error in registering the user")
        console.log(err)
    }
    
  })
  userRouter.post("/login",async(req,res)=>{
    
    const  {email,pass}=req.body

    try{
        const user=await UserModel.find({email})
            if(user.length>0){
                bcrypt.compare(pass, user[0].pass, function(err, result) {
                    if(result){
                        const token = jwt.sign({ course: 'backend' }, 'masai');
                        res.send({"msg":"Login Successfull","token":token})
                    } else {res.send("Wrong Credntials")}
                    });
            } else {
                res.send("Wrong Credntials")
                }
    }catch(err){
        res.send("Something went wrong")
        console.log(err)

    }

  })
  module.exports={
    userRouter
  }