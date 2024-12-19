import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from "jsonwebtoken"

// Register
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // Remove all spaces from userName, email, and password
  const cleanedUserName = userName.replace(/\s+/g, '')
  const cleanedEmail = email.replace(/\s+/g, '')
  const cleanedPassword = password.replace(/\s+/g, '')

  try {
    
    const checkUser = await User.findOne({ email: cleanedEmail });
    if (checkUser) {
      return res.status(400).json({ message: 'Email Already Exists' });
    }
    const hashPassword = await bcrypt.hash(cleanedPassword, 10)

    const newUser = await User.create({
      userName: cleanedUserName,
      email: cleanedEmail,
      password: hashPassword,
    })

    res.status(201).json({
      message: 'Register successfully',
      data: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
      },
    })


  } catch (error) {
    console.log('Error in register controller', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const cleanedEmail = email.replace(/\s+/g, '')
  const cleanedPassword = password.replace(/\s+/g, '')

  try {
    const checkUser = await User.findOne({ email:cleanedEmail });
    if (!checkUser)
      return res.json({message: "User doesn't exists! Please register first"});

    const checkPasswordMatch = await bcrypt.compare(password,checkUser.password);
    if (!checkPasswordMatch)
      return res.json({ message: "Incorrect password! Please try again"});

       const token=await jwt.sign({id:checkUser._id,role:checkUser.role},process.env.JWT_SECRET,{expiresIn:"1d"})

        return res.status(200).cookie('token',token,{httpOnly:true,sameSite:"strict",maxAge:1 * 24 * 60 * 60 * 1000}).json({
            message:"Loggedin successfully",
            token:token
        })

  
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ message: 'Internal server error' });
  } 
}

//Logout
export const logoutUser =async(_,res)=>{
  try {
      return res.cookie('token','',{maxAge:0}).status(200).json({
          message:"Logged out successfully"
      })
  } catch (error) {
      console.log("error in logout controller",error.message)
      res.status(500).json({error:"Internal server error"})
  }
}