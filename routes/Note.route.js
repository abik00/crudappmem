const express=require('express')
const { NoteModel } = require('../backend/models/Note.model')
const noteRouter=express.Router()
const fs=require("node:fs")


noteRouter.get("/",(req,res)=>{
    res.send("all the note")
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const new_note=new NoteModel(payload)
        await new_note.save()
        res.send("create the note")
    }catch(err){
        console.log("something rong in note/create")
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID

    try{
        
        await NoteModel.findByIdUpdate({"_id":id},payload)
        res.send("Update the note")

    }catch(err){
        console.log(err)
        res.send({"msg":"something is wrong"})
    }
    
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await NoteModel.findByIdDelete({"_id":id})
        res.send("Deleted the note")

    }catch(err){
        console.log(err)
        res.send({"msg":"something is wrong"})

    }
})

module.exports={
    noteRouter
  }