const router = require("express").Router();
const {verifyToken, verifyAuth, verifyAuthAndAdmin} = require("./VerifyToken")
const User = require("../models/User")
const CryptoJS = require("crypto-js")

router.put("/:id", verifyAuth, async (req, res)=>{
  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.pass_key).toString()
  }
   try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new:true})
    res.status(200).json(updatedUser)
   }catch(err){
    res.status(400).json(err)
   }

})

//create
router.post("/admin/register", verifyAuthAndAdmin, async (req,res)=>{
  const user = new User({
    username:req.body.username,
    email:req.body.email,
    password:CryptoJS.AES.encrypt(req.body.password, process.env.pass_key).toString()
  })
  try {
    const saveduser = await user.save()
    res.status(200).json(saveduser)
  } catch (error) {
    res.status(400).json(error)
    console.log(error)
  }
})

// Delete
router.delete("/:id", verifyAuthAndAdmin, async (req, res)=>{
try{
await User.findByIdAndDelete(req.params.id)
res.status(200).json("user deleted successfully")
}catch(err){
  res.status(400).json(err)
}
})

// Get user
router.get("/find/:id", verifyAuthAndAdmin, async (req, res)=>{
  try{
  const user = await User.findById(req.params.id)
  const {password, ...others} = user._doc;
  res.status(200).json(others)
  }catch(err){
    res.status(400).json(err)
  }
  })

  // Get all users
  router.get("/", verifyAuthAndAdmin, async (req, res)=>{
    const query = req.query.new
    try{
    const users = query? await User.find().sort({_id:-1}).limit(5) : await User.find()
    res.status(200).json(users)
    }catch(err){
      res.status(400).json(err)
    }
    })

      // Get stats
      router.get("/stats", verifyAuthAndAdmin, async (req, res)=>{
        const date = new Date();
        const prevyear = new Date(date.setFullYear(date.getFullYear() - 1));
        console.log(date)
        try{
          const data = await User.aggregate([
            {$match: {createdAt: {$gte: prevyear}}},
            {
              $project:{
                month: { $month: "$createdAt"},
              }
            },
            {
              $group:
              {_id: "$month",
              total: {$sum: 1}}
            }
          ])
          res.status(200).json(data)

        }catch(err){
          console.log(err)
          res.status(500).json(err)
        }
        
      })
      

module.exports = router;