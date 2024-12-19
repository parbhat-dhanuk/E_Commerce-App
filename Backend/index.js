import express from "express"
import { config } from "dotenv"
import connectDB from "./utils/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
config()
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import adminSeeder from "./seeder/adminSeeder.js"

const app=express()
const PORT=process.env.PORT
app.use(express.json())  // to parse the json file
app.use(cookieParser())  // to verify the token from cookie


//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true                         
  }));

//Routes
app.use('/api',userRouter)
app.use("/api",productRouter)




app.listen(PORT,()=>{
    connectDB()
    adminSeeder()
    console.log(`Server is running in port:${PORT}`)
})