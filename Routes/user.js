const router = require("express").Router();
const {verifyToken, verifyAuth, verifyAuthAndAdmin} = require("./VerifyToken")
const User = require("../models/User")

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
router.get("/:id", verifyAuthAndAdmin, async (req, res)=>{
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
    const users = query? await user.find().sort({_id:-1}).limit(5) : await User.find()
    res.status(200).json(users)
    }catch(err){
      res.status(400).json(err)
    }
    })

module.exports = router;