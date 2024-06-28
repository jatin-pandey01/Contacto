import mongoose,{Schema,model, trusted} from "mongoose";

const contactSchema = new Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    },
    number:{
      type:String,
      required:true
    },
    email:{
      type:String,
      trim:trusted
    },
    linkedin:{
      type:String,
      trim:trusted
    },
    twitter:{
      type:String,
      trim:trusted
    },
    owner:{
      type:mongoose.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps:true
  }
);

export const Contact = model("Contact",contactSchema);