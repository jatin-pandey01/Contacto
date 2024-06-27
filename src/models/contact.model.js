import mongoose,{Schema,model} from "mongoose";

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