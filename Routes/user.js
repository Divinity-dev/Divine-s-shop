const router = require("express").Router();
const {verifyToken, verifyAuth} = require("./VerifyToken")
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


module.exports = router;