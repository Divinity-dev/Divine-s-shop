const router = require("express").Router();
const {verifyToken, verifyAuth, verifyAuthAndAdmin} = require("./VerifyToken")
const User = require("../models/Products")
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


module.exports = router;