const router = require("express").Router();
const {verifyToken, verifyAuth, verifyAuthAndAdmin} = require("./VerifyToken")
const CryptoJS = require("crypto-js");
const Products = require("../models/Products");

//Create

router.post("/", verifyAuthAndAdmin,  async (req, res)=>{
    const newproduct = new Products(req.body)
    try{
        const savedProduct = await newproduct.save()
        res.status(200).json(savedProduct)

    }catch(err){
        console.log(err)
    }
})

//Update
router.put("/:id", verifyAuthAndAdmin, async (req, res)=>{
    
     try{
      const updatedProduct = await Products.findByIdAndUpdate(req.params.id, {
          $set: req.body
      }, {new:true})
      res.status(200).json(updatedProduct)
     }catch(err){
      res.status(400).json(err)
     }
  
  })

  // Delete
router.delete("/:id", verifyAuthAndAdmin, async (req, res)=>{
    try{
    await Products.findByIdAndDelete(req.params.id)
    res.status(200).json("Product deleted successfully")
    }catch(err){
      res.status(400).json(err)
    }
    })

    // Get product
router.get("/find/:id", async (req, res)=>{
    try{
    const product = await Products.findById(req.params.id)
    res.status(200).json(product)
    }catch(err){
      res.status(400).json(err)
    }
    })

      // Get all Products
  router.get("/", async (req, res)=>{
    const qnew = req.query.new
    const qCategory = req.query.Category
    try{
        let product;
        if(qnew){
           product = await Products.find().sort({createdAt: -1}).limit(5)
        }else
        if(qCategory){
            product = await Products.find({categories: { $in:[qCategory]}})
        }else{
            product = await Products.find()
        }
    res.status(200).json(product)
    }catch(err){
      res.status(400).json(err)
    }
    })


module.exports = router;