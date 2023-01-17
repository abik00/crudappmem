const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authenticate
    if(token){
        const decoded =jwt.verify(token,"masai")
        if(decoded){
            next()
        }else{
            res.send("please login First")
        }
    }else{
        res.send("please login First")
    }
}


module.exports={
    authenticate
  }