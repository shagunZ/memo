import jwt from "jsonwebtoken";

export const sendCookie=(user,res,message,statusCode=200)=>{

    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    res
    .status(statusCode)
    .cookie("token",token,{
        httpOnly:true,
        maxAge: 15*60*1000, //15mint
        sameSite:process.env.NODE_ENV==="Production"?"lax":"none",
        secure: process.env.NODE_ENV==="Production"?false:true,
         
    })
    .json({
        success:true,
        message,
    });
}