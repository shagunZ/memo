import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


//get request
export const getAllUsers=async(req,res,next)=>{ }

//post request
export const login=async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid email or password",400));
    
        const isMatch=await bcrypt.compare(password,user.password);
    
        if(!isMatch)return res.status(404).json({
            success:false,
            message:"Invaid email or password"
        });
    
    sendCookie(user,res,`Welcome back, ${user.name}`,200);
    } catch (error) {
        next(error)
    }

}

//post request
export const register=async(req,res)=>{
  try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email})

    if(user) return next(new ErrorHandler("User already exist",400));

    const hashedPassword = await bcrypt.hash(password,10)

     user =await User.create({name,email,password:hashedPassword});
sendCookie(user,res,"Registered Successfully",201);
  } catch (error) {
    next(error)
  }
};

//get request
export const getMyProfile= (req,res)=>{

    res.status(200).json({
        success:true,
        user:req.user,
    })
}


//in logout we just expired the cookie interval
//post requrest
export const logout= (req,res)=>{
    res
    .status(200)
    .cookie("token","",{
        expires:new Date(Date.now()) ,
    sameSite: process.env.NODE_ENV === "Production" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Production" ? false : true,
    })
    .json({
        success:true,
        user: req.user,
    });
}








// export const getAllUsers = async(req,res)=>{
//     const users = await User.find({});
//     console.log(req.query)

//     res.json({
//         success:true,
//         users,
//     })
// }

// export const login= async (req,res,next)=>{
   
// }

// export const register = async (req,res)=>{

//     const {name,email,password} = req.body;
//     await User.create({
//         name,
//         email,
//         password,
//     })
// res.status(201).cookie("temp","cook").json({
//     success:true,
//     message:"registered successfully",
// });
// }

// export const specialFunc = async (req,res)=>{
//     res.json({
//         success:true,
//         message:"speciall",
//     })
// }

// export const getUserDetails= async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success:true,
//         user,
//     })
// }

// export const updateUser= async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success:true,
//         message:"updated",
//     })
// }
// export const deleteUser= async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     // await user.remove()
//     res.json({
//         success:true,
//         message:"deleted",
//     })
// }