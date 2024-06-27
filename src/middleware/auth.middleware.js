import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { config } from "dotenv";

config();

export const verifyJWT = async(req,res,next)=>{
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ","");

    if(!token){
      return res.status(401).json({
        success:false,
        message:"Unauthorized user"
      });
    }

    const decodeToken = await jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decodeToken?._id).select("-password");

    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid access token."
      })
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error, please try again."
    })
  }
}