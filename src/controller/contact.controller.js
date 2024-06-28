import mongoose from "mongoose";
import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";

export const createContact = async(req,res)=>{
  try {
    const {name,number,email="",linkedin="",twitter=""} = req.body;

    if(!req.user){
      return res.status(401).json({
        success:false,
        message:"User is unauthorized"
      });
    }

    const checkNameAndNumber = await Contact.findOne({$or:[{name:name},{number:number}]});
    console.log(checkNameAndNumber);
    if(checkNameAndNumber){
      return res.status(400).json({
        success:false,
        data : checkNameAndNumber,
        message:"Name or Number already exist",
      });
    }

    const contactCreation = await Contact.create({
      name:name,
      number:number,
      owner:req.user?._id,
      email:email,
      linkedin:linkedin,
      twitter:twitter
    });

    return res.status(200).json({
      success:true,
      data: contactCreation,
      message:"Contact saved successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server error."
    });
  }
}

export const editContact = async(req,res) => {
  try {
    const {name ,email="",linkedin="",twitter=""} = req.body;

    const checkNameAndNumber = await Contact.findOne({name:name});

    if(!checkNameAndNumber){
      return res.status(400).json({
        success:false,
        message:"Name doesn't exist in the contact."
      });
    }

    if(email){
      checkNameAndNumber.email = email;
    }
    if(linkedin){
      checkNameAndNumber.linkedin = linkedin;
    }
    if(twitter){
      checkNameAndNumber.twitter = twitter;
    }

    checkNameAndNumber.save();

    return res.status(200).json({
      success:true,
      data:checkNameAndNumber,
      message:"Contact edited successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error, please try again."
    });
  }
}

export const searchContact = async(req,res) => {
  try {
    const {contactName} = req.body;

    const contact = await User.aggregate([
      {
        $match:{
          _id : new mongoose.Types.ObjectId(req.user?._id)
        },
      },
      {
        $lookup:{
          from:"contacts",
          localField:"_id",
          foreignField:"owner",
          as:"searchedContact",
          pipeline:[
            {
              $match:{
                name:{
                  $regex:contactName
                }
              }
            }
          ]
        }
      }
    ]);

    console.log(contact[0].searchedContact);

    return res.status(200).json({
      success:true,
      data:contact[0]?.searchedContact,
      message:`All contact with ${contactName}.`
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error."
    });
  }
}
