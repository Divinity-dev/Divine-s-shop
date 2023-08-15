const router = require("express").Router();
const User = require("../models/User")
 
// signup

router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const saveduser = await newUser.save()
        res.status(201).json(saveduser)
    }catch(err){
        res.status(400).json(err)
        console.log(err)
    }
})


module.exports = router;