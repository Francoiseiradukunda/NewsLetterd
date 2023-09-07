import { JsonWebTokenError, verify } from "jsonwebtoken"
import errorResponse from "../utils/errorResponse"

const verifyAccess=(req,res,next)=>{
    const token=req.header["auth-token"]

    if(!token){
        return errorResponse(res,401,`no token privided`)
    }else{
        try {
            const verifyToken=jwt.verify(token,process.env.SECRET_KEY,{expressIn:"1d"})

            if(verifyToken.role!=="admin"){
                return errorResponse(res,401,`you don't have access`)
            }
            return next()

        } catch (error) {
            if(error.name==JsonWebTokenError){
                return errorResponse(res,401,`invalid token`)
            }
        }
    }

}

export default verifyAccess