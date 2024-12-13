import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/load.js';


const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({
            success:false,
            message:'Unauthorize access'
        })
    }

    try{
        const token_decode = jwt.verify(token,jwtSecret);
        req.body.userId = token_decode.id;
        next();
    }catch(err){
        console.log(error);
        res.json({
            success:false,
            message:'Something went wrong'
        })
    }
}

export default authMiddleware;