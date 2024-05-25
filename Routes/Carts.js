const router = require("express").Router();
const Cart = require("../models/Carts");
const { verifyAuthAndAdmin, verifyAuth, verifyToken } = require("./VerifyToken");

//Create

router.post("/", verifyAuth,  async (req, res)=>{
    const cart = new Cart(req.body)
    try{
        const savedCart = await cart.save()
        res.status(200).json(savedCart)

    }catch(err){
        res.status(400).json(err)
    }
})


 
//Update
router.put("/:id", verifyAuth, async (req, res)=>{
    
    try{
     const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
         $set: req.body
     }, {new:true})
     res.status(200).json(updatedCart)
    }catch(err){
     res.status(400).json(err)
    }
 
 })

   // Delete
router.delete("/:id", verifyAuth, async (req, res)=>{
    try{
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Cart deleted successfully")
    }catch(err){
      res.status(400).json(err)
    }
    })

    
    // Get cart
router.get("/find/:userid",verifyAuth, async (req, res)=>{
    try{
    const cart = await Cart.findOne({userid: req.params.id})
    res.status(200).json(cart)
    }catch(err){
      res.status(400).json(err)
    }
    })

    // Get all carts
    router.get("./",verifyAuth, async (req, res)=>{
        try{
            const carts = await Cart.find()
            res.status(200).json(carts)
        }catch(err){
            res.status(500).json(err)
        }
    })


module.exports = router;