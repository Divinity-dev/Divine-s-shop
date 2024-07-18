const router = require("express").Router();
const Order = require("../Models/Order");
const { verifyAuthAndAdmin, verifyAuth, verifyToken } = require("./VerifyToken");


//Create

router.post("/", verifyAuth,  async (req, res)=>{
    const order = new Order(req.body)
    try{
        const savedOrder = await order.save()
        res.status(200).json(savedOrder)

    }catch(err){
        res.status(500).json(err)
    }
})
 
//Update
router.put("/:id", verifyAuthAndAdmin, async (req, res)=>{
    
    try{
     const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
         $set: req.body
     }, {new:true})
     res.status(200).json(updatedOrder)
    }catch(err){
     res.status(400).json(err)
    }
 
 })

   // Delete
router.delete("/:id", verifyAuthAndAdmin, async (req, res)=>{
    try{
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order deleted successfully")
    }catch(err){
      res.status(400).json(err)
    }
    })

    
    // Get order
router.get("/find/:userid",verifyAuth, async (req, res)=>{
    try{
    const order = await Order.findOne({userId: req.params.id})
    res.status(200).json(order)
    }catch(err){
      res.status(400).json(err)
    }
    })

    // Get all orders
    router.get("/",verifyAuthAndAdmin, async (req, res)=>{
        try{
            const orders = await Order.find()
            res.status(200).json(orders)
        }catch(err){
            res.status(500).json(err)
        }
    })

    // Get income
    router.get("/income", verifyAuthAndAdmin, async (req, res)=>{
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const prevMonth = new Date(new Date(date.setMonth(date.getMonth() - 1)))
        try{
            const data = await Order.aggregate([
                {$match: {createdAt: {$gte: lastMonth}}},
                {
                  $project:{
                    month: { $month: "$createdAt"},
                     sales: "$amount"
                  }
                },
                {
                  $group:
                  {_id: "$month",
                  total: {$sum: "$sales"}}
                }
              ])
          res.status(200).json(data)
        }catch(err){
            res.status(400).json(err)
        }
    })

module.exports = router;