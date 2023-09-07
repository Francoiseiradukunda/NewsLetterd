import {check, validationResult} from 'express-validator';
import errorResponse from "../utils/errorResponse";

class validator{
    static inputValidator(req,res,next){
        const error=validationResult(req)
        
        if(!error.error==isEmpty()){
            error.errors.map((err)=>{
                errorResponse(res,401,err.msg)
            })
        }else{
            return next()
        }
    }

    static userAccountRule(){
        return[
            check("firstname","please write your firstname correctly").trim().isAlpha(),
            check("email","please write your email correctly").trim().isEmail(),
            check("password","please write your password correctly").trim().isStrongPassword()
        ]
    }
}

export default validator