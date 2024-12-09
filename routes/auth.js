import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router =express.Router()

router.post('/register',async (req,res) =>{
try{
     const {name,email,password} = req.body;
     const user = await User.findOne({email})
     if(user){
        return res.status(401).json({success:false,message:"user already exist"})
     }
     const hashPassword= await bcrypt.hash(password,10)
     const newUser = new User({
        name,email,password: hashPassword
     })
     await newUser.save()
     return res.status(200).json({success:true, message:"Account created successfully"})

}catch(error){
   console.log(error.message)
    return res.status(500).json({success:false, message:"error in adding user"})


}
})
router.post('/login',async (req,res) =>{
   try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
           return res.status(401).json({success:false,message:"user does not exist"})
        }
        const checkpassword = await bcrypt.compare(password, user.password)
        if(!checkpassword){
         return res.status(401).json({success:false,message:"wrong credentials"})
        }
       const token = jwt.sign({id:user._id}, "secretkeyfornoteapp@123",{expiresIn:"5h"})
       
        return res.status(200).json({success:true,token, user:{name:user.name}, message:"Login successfully"})
   
   }catch(error){
      console.log(error.message)
       return res.status(500).json({success:false, message:"error in login server"})
   
   
   }
   })

export default router