import Message from "../model/message";
import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";

class messageControler{
    static async createMessage(req,res){
        const {emai,message}=req.body
        const msg=await Message.create({email,message})
        if(!msg){
            return errorResponse(res,401,`no message found`)
        }else{
            return successResponse(res,200,`message has been sent`)
        }
    }
}