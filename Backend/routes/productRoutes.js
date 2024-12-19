import express from "express"
import { addProduct, deleteProduct, fetchAllProducts, updateProduct } from "../controllers/productController.js"
import { upload } from "../utils/cloudinary.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import authorizeRole from "../middleware/roleMiddleware.js"


const router=express.Router()
router.post('/addProduct',isAuthenticated,authorizeRole("admin"),upload,addProduct)
router.get('/fetchAllProducts',isAuthenticated,fetchAllProducts)
router.patch('/updateProduct/:id',isAuthenticated,authorizeRole("admin"),upload,updateProduct)
router.delete('/deleteProduct/:id',isAuthenticated,authorizeRole("admin"),deleteProduct)


export default router