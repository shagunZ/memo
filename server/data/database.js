import mongoose from "mongoose"

export const connectDB =()=>{


mongoose
    .connect(process.env.MONGO_URI,{
    dbName:"backendapi",
})
    .then((c)=>console.log(`database connected with ${c.connection.host}`))
    .catch((e)=>console.log(e));

}

//mongodb+srv://demo1:demo1@cluster0.arbljnq.mongodb.net/
//mongodb+srv://nodejs:nodejs@cluster0.pxaim.mongodb.net/