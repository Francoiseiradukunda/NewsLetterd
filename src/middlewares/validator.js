import {check, validationResult} from 'express-validator';
import errorResponse from "../utils/errorResponse";

class validator{
    static inputValidator(req,res,next){
        const error=validationResult(req)
        
        if(!error==error.isEmpty()){
            error.errors.map((err)=>{
             return errorResponse(res,401,err.msg)
            })
        }else{
            return next()
        }
    }

    static userAccountRule(){
        return[
            check("firstname","please  firstname must be compose by alphabet only").trim().isAlpha(),
            check("email","please email must composed by @gmail.com").trim().isEmail(),
            check("password","please password must be strong").trim().isStrongPassword()
        ]
    }
}

export default validator
