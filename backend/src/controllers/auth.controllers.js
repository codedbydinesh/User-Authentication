import uploadImageOnCloudinary from "../config/cloudinary.js";
import { generateToken } from "../config/token.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;

    let profileImage;

    if(req.file){
      profileImage = await uploadImageOnCloudinary(req.file.path)
    }
    console.log(profileImage);
    
    

    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "user Already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
      profileImage
    });

    let token = generateToken(user._id);

    let option = {
      httpOnly:true,
      secure:true,
    }
    res.cookie("token", token, option)
    
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        firstName,
        lastName,
        email,
        userName,
        profileImage
      },
    });



  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    let existUser = await User.findOne({email})

    if(!existUser) {
      return res.status(400).json({message:"user does't exist"})
    }

    let matchPassword = await bcrypt.compare(password, existUser.password);

    if(!matchPassword){
      return res.status(400).json({
        message:"Incorrect Password"
      })
    }

    let token = generateToken(existUser._id);

    let option = {
      httpOnly:true,
      secure:true,
    }
    res.cookie("token", token, option)

    return res.status(200).json({
      message: "User loggedIn",
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        userName: existUser.userName,
      },
    })

  } catch (error) {
    return res.status(500).json({
      message:"invalid ID or password",
      error:error.message,
    })
    
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message:"logout successfully"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}