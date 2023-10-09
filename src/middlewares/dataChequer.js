
import User from "../model/User";
import errorResponse from "../utils/errorResponse";

class dataChequer{
static userRegisterIsEmpty=(req,res,next)=>{
    const{firstname,lastname,email,password}=req.body

    if(firstname==""){
        return errorResponse(res,401,`please fill your firstname`)
    }
    else if(lastname==""){
return errorResponse(res,401,`please fill your lastname`)
    }
    else if(email==""){
        return errorResponse(res,401,`please fill your email`)
    }
    else if(password==""){
        return errorResponse(res,401,`please fill your password`)
    }
    else{
        return next()
    }
}
static async emailExist(req,res,next){
const email=req.body.email;
const user=await User.findOne({email})
if(user){
    return errorResponse(res,401,`email alread exist`)
}
else{
    return next()
}
}

}
export default dataChequer