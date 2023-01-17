const express = require('express')
const {connection}=require("./configs/db")
const {userRouter}=require("../routes/User.routes")
const {NoteModel}=require("../models/Note.model")
const {noteRouter}=require("../routes/Note.route")
const {authenticate}=require("../middleware/authenticate.middleware")

const app = express()
app.use(express.json())



app.get('/', function (req, res) {
  res.send('welcome home')
})




// app.get("/data",(req,res)=>{

//   const token=req.query.token

//   jwt.verify(token, 'masai', (err,decoded)=> {
//     if(err){
//       res.send("please login again")
//       console.log(err)
//     }else{
//       res.send("data...")
//     }
//   });

  
// })

// app.get("/cart",(req,res)=>{
//   const token=req.query.token
//   if(token==="abc123"){
//     res.send("cart page..")
//   }else{
//     res.send("login first ..")
//   }
// })


app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(4500,async()=>{
  try{
    await connection
    console.log('connected to db')
  }catch(err){
    console.log("err in server")
    console.log(err)
  }
    
})