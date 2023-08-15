const jwt = require("jsonwebtoken")



const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(token, process.env.jwt_key, (err, data)=>{
            if(err){
                res.status(401).json("token not valid")
            }
            req.user = data
            next();
        })
    }else{
        res.status(401).json("you're not authenticated")
    }
}

module.exports = {verifyToken}