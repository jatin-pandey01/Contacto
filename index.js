import app from "./app.js";
import connectDB from "./db/index.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
  app.on("error",(err)=>{
    console.log("Error in connection : ",err);
  });

  app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
  });
})
.catch((err)=>{
  console.log(`Error in DB : ${err}`);
});