const router = require("express").Router();


router.get("/test", (req, res) => {
    res.send("test sucessful")
})
router.post("/usertest", (req, res) => {
    const username = req.body.username;
    res.send(username)
    console.log(username)
})

module.exports = router;