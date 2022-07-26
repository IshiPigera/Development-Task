const jwt = require("jsonwebtoken")

const auth =(req, res, next) => {
    try{
        const token = req.header("Auth")
        if(!token){
            return res.status(400).json({message: "Invalid authorization"})
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
            if(err){
                return res.status(400).json({message: "Authorization not valid"})
            }
            
            req.user = user;
            next()
        })
    }
 catch(err){
    return res.status(500).json({message: err.message})
}

}


module.exports = auth