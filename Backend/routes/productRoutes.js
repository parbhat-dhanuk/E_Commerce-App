import express from "express"
import { addProduct } from "../controllers/productController.js"
import { upload } from "../utils/cloudinary.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import authorizeRole from "../middleware/roleMiddleware.js"


const router=express.Router()
router.post('/addProduct',isAuthenticated,authorizeRole("admin"),upload,addProduct)


export default router