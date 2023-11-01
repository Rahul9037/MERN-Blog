const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const auth = (req,resp,next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    //check token
    if(authHeader==null){
        return resp.status(401).json({message: 'Invalid User'});
    }
    try{
        //verify token
        const bearer = authHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken , secret); 
        req.id={username:verified.username,
                id: verified.id};
        next();
    }
    catch(err){
        console.log("err",err)
        resp.status(401).json({message: 'Invalid User..'});
    }
}

module.exports = {auth}