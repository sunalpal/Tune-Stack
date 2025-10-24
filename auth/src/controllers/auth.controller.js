import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcryptjs";
import { publishToQueue } from "../broker/rabbit.js";

export async function register(req, res) {
  const {
    email,
    password,
    fullname: { firstName, lastName },
  } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const User = await userModel.create({
    email,
    password: hashedPassword,
    fullname: {
      firstName,
      lastName,
    },
  });

  const token = jwt.sign(
    {
      id: User._id,
      role: User.role,
    },
    config.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );

    await publishToQueue("user_created", {
    id: User._id,
    email: User.email,
    fullname: User.fullname,
    role: User.role,
  });
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: User._id,
      email: User.email,
      fullname: User.fullname,
      role: User.role,
    }
  });
}


export async function googleAuthCallback(req, res) {

const user=req.user;

const isUserAlreadyExists= await userModel.findOne({
$or:[
    {email:user.emails[0].value},
    {googleId:user.id}
]
})

if(isUserAlreadyExists){
   const token= jwt.sign({
        id:isUserAlreadyExists._id,
        role:isUserAlreadyExists.role,
   }, config.JWT_SECRET,{
        expiresIn:'2d',
   })
    res.cookie('token', token);
    res.status(200).json({
        message:'User logged in successfully',
        user:{
            id:isUserAlreadyExists._id,
            email:isUserAlreadyExists.email,
            fullname:isUserAlreadyExists.fullname,
            role:isUserAlreadyExists.role,
        }
    })
}

const newUser= await userModel.create({
    googleId:user.id,
    email:user.emails[0].value,
    fullname:{
        firstName:user.name.givenName,
        lastName:user.name.familyName,
    } 

})
await publishToQueue("user_created",{
    id: newUser._id,
    email: newUser.email,
    fullname: newUser.fullname,
    role: newUser.role,
})
const token= jwt.sign({
    id:newUser._id,
    role:newUser.role,
}, config.JWT_SECRET,{
    expiresIn:'2d'
})
res.cookie('token', token);

res.status(201).json({
    message:'User registered successfully',
    user:{
        id:newUser._id,
        email:newUser.email,
        fullname:newUser.fullname,
        role:newUser.role,
    }
})

}