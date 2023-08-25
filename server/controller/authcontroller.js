import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Users from '../models/auth.js'


const JWT_SECRET="Ri5h7an&$"

export const signup=async(req,res)=>{
    const {email,password,name}=req.body
  try{
  let user= await Users.findOne({email:email});
  if(user){
    return res.status(400).json({error:"Sorry a user with this email already exists"}) 
  }
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(password,salt);

     user= await Users.create({
          name: name,
          password: secPass,
          email:email
        })

    const data={
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({authToken:authToken})
    
      }catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured") 
      }
}
export const login=async(req,res)=>{

   const {email,password}=req.body;
   try {
     let user=await Users.findOne({email:email});
     if(!user){
      return res.status(400).json({error:"please try to login with corrrect credentials"});
  
     }
     const passwordCompare=await bcrypt.compare(password,user.password);
     if(!passwordCompare){

      return res.status(400).json({ error:"please try to login with corrrect credentials"});
      
     }
     const data={
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({authToken:authToken})
    
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured")
     
   }
}
export const getUser=async(req,res)=>{
    try {
       
        let user= await Users.findById(req.user.id).select("-password");
        if(!user)
        {
            return res.send("user doesnot exist");
        }
        
        res.send(user)
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
      }
}