import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

export const register = async(req,res)=>{
  try {
    const {name,email,password} = req.body;

    const userExist = await User.findOne({email:email});

    if(userExist){
      return res.status(401).json({
        success:false,
        message:"Email id already exist, please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const userCreate = await User.create({
      email:email,
      name:name,
      password:hashedPassword
    });

    const userData = await User.findById(userCreate._id).select("-password");

    if(!userData){
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      });
    }

    return res.status(200).json({
      success:true,
      data:userData,
      message:"User created successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
}

export const login = async(req,res) => {
  try {
    const {email,password} = req.body;
    console.log("object1 => ");
    const userExist = await User.findOne({email:email});
    console.log("object2 => ", userExist);
    if(!userExist){
      return res.status(400).json({
        success: false,
        message:"User doesn't exist, please register."
      });
    }
    console.log("object3 => ", userExist.password);
    const checkPassword = await bcrypt.compare(password,userExist.password);
    console.log("object4 => ", checkPassword);
    if(!checkPassword){
      return res.status(401).json({
        success:false,
        message:"Password is wrong."
      });
    }

    // const payload = ;


    const token = await jwt.sign(
      {
        _id:userExist._id,
        email:email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY
      }
    );
    console.log("object5 => ", token);

    const options = {
      httpOnly:true,
      secure:true
    }

    return res.status(200).cookie("token",token,options).json({
      success:true,
      data:userExist
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error while logging."
    }); 
  }
}

export const getUser = async(req,res) => {
  try {
    if(!req.user){
      return res.status(401).json({
        success:false,
        message:"Unauthorized user."
      });
    }

    const user = await User.findById(req.user?._id).select("-password");

    return res.status(200).json({
      success:false,
      data:user,
      message:"User fetched successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error."
    });
  }
}
