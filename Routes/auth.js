const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
 
// signup

router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.pass_key).toString()
    })

    try{
        const saveduser = await newUser.save()
        res.status(201).json(saveduser)
    }catch(err){
        res.status(400).json(err)
        console.log(err)
    }
})

// Login

router.post("/login", async (req, res) => {
try{
  const user = await User.findOne({username: req.body.username})
  if (!user) {
    return res.status(404).json("No user with this name"); // Return early for invalid user
}

const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.pass_key).toString(CryptoJS.enc.Utf8);

if (decryptedPassword !== req.body.password) {
    return res.status(401).json("Incorrect password"); // Return early for incorrect password
}

const acessToken = jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin
}, process.env.jwt_key,
{expiresIn:"3d"})
const {password, ...others} = user._doc;
 res.status(200).json({...others, acessToken})
}catch(err){
    res.status(400).json(err)
}
})


module.exports = router;