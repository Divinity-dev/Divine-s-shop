const jwt = require("jsonwebtoken")



const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.jwt_key, (err, data)=>{
            if(err){
                res.status(401).json("token not valid")
            }
            console.log(data);
            req.user = data
            next();
        })
    }else{
        res.status(401).json("you're not authenticated")
    }
}

const verifyAuth = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
             res.status(400).json("you're not allowed to do that")
        }
    })
}

module.exports = {verifyToken, verifyAuth}