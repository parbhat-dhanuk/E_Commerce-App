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


  //fetch all products

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({data:products})
  } catch (error) {
    console.log("error in fetchAllProduct controller",error.message);
    res.status(500).json({message: "Internal server error"})
  }
}


//update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const {title,description,category,brand,price,salePrice,totalStock,averageReview} = req.body;
    const file=req.file
    let product = await Product.findById(id);
    if (!product){
      return res.status(404).json({message:"Product not found"})
    }
  
    let imageUrl = product.imageUrl
    let imagePublicId = product.imagePublicId

    if (file) {
      // Delete old image from Cloudinary if it exists
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'E-Commerce',
        transformation: [
          { width: 300, height: 300, crop: "fill"}, // Example crop
        ]
      })

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }
   
    const updatedProduct=await Product.findByIdAndUpdate(id,{
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
    },{new:true})

    res.status(200).json({
      message:"product updated successfully",
      data:updatedProduct
    })
    
  } catch (error) {
    console.log("error in updateProduct controller",error.message);
    res.status(500).json({message: "Internal server error"})
  }
}

//deleteProduct
export const deleteProduct=async(req,res)=>{
  try {
      const {id}=req.params
      const product = await Product.findById(id);
      if(!product){
          return res.status(400).json({message:"product not available"})
      }

      // Delete image from Cloudinary
    const publicId = product.imagePublicId; // Assuming your product model has `imagePublicId`
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
      // Delete product from database
      await Product.findByIdAndDelete(id)
      res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
      console.log("Error in deleteBlog controller",error.message)
      res.status(500).json({error:`Internal server error`})
  }
}