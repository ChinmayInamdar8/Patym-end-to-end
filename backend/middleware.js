const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config');

const AuthMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || ! authHeader.startsWith('Bearer ')){
        res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        next();
    }
    catch(e){
        return res.status(403).json({});
    }
}

module.exports = {AuthMiddleware};