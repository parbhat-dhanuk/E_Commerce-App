import Product from "../models/productModel.js"
import { cloudinary } from "../utils/cloudinary.js"

//add a new product
export const addProduct = async (req, res) => {
    try {
      const {title,description,category,brand,price,salePrice,totalStock,averageReview} = req.body
      const file=req.file

  if(!file){
    return res.status(400).json({message:"please provide image"})
  }

if(!title||!description||!category||!brand||!price||!salePrice||!totalStock||!averageReview){
    return res.status(400).json({message:"please provide all fields"})
}
  
let imageUrl
let imagePublicId
if (file) {
    // Upload image to Cloudinary
const uploadResult = await cloudinary.uploader.upload(file.path,{
folder:'E-Commerce',
transformation: [
{ width: 300, height: 300, crop: "fill"}, // Example crop
],
})
imageUrl = uploadResult.secure_url
imagePublicId = uploadResult.public_id
}
 const newProduct = await Product.create({
        imageUrl,
        imagePublicId,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
      })
      res.status(201).json({ message:"Product created successfully",data:newProduct})
    } catch (error) {
      console.log("error in product controller",error.message)
      res.status(500).json({ message: 'Internal server error' })
    }
  }