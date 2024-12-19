import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

const adminSeeder = async()=>{
    const email="admin@gmail.com"
    const password="admin123"
    const userName="admin"
    const role="admin"

   const data = await User.findOne({email})
    if(!data){ 
      
        await User.create({
            email,
            password: bcrypt.hashSync(password,10),
            userName,
            role
        })
        console.log("admin credentials seeded successfully")
    }else{
        console.log("admin credentials already seeded")
    }
}

export default adminSeeder