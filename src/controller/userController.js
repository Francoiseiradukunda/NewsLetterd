import User from "../model/User";
import bcrypt,{hash} from "bcrypt"

import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";
import { Jwt } from "jsonwebtoken";


class usercontroller {
  static async createUser(req, res) {

const {firstname,lastname,email,password}=req.body
    try {
      if (req.body.password !== req.body.confirmPassword) {
        return errorResponse(res,403,"password and confirm password is not matched")
        };
  
        const hashpassword=bcrypt.hashSync(req.body.password,10)
          const user =await User.create({firstname,lastname,email,password:hashpassword})

return successResponse(res,201,`user successfly created`,user);
      }catch (error) {

     
        return errorResponse(res,500,`error`)
     
    }
  }


  static async getAllUsers(req, res) {
    const hell = await User.find();
    if (!hell || hell.length == 0) {
      return errorResponse(res,401,'no user faund')
    
      }
     else if (hell) {
      const status=200
      const msg=`all ${hell.length} user found`
      const data=hell
      return successResponse(res,status,msg,data)
      
    }
  }

  static async deleteAllUsers(res,req){
      const vav=await User.deleteMany()
          return successResponse(res,200,`all user deleted`,vav)

  }
static async getOneUser(req,res){
  const id=req.params.ido
  const user=await User.findById(id)
  if(!user){
    return errorResponse(res,401,`no user foun with that id:${id}`)
  }

else{
  return successResponse(res,200,`user successfuly retrieved`,user)
}

}
static async updateUser(req,res){
  const id=req.params.id
  const user=await User.findByIdAndUpdate(id,req.body,{new:true})
  if(!user){
    errorResponse(res,401,`user with id ${id} not found`)
  }else{
    successResponse(res,200,`user successfuly updated`,user)
  }
}

static async deleteOneUser(req,res){
  const id=req.params.id
const user=await User.findByIdAndDelete(id)
if(!user){
  return errorResponse(res,401,`user not found`)
}
else{
  return successResponse(res,200,`user has been deleted`)
}
}

static async login(req,res){
  const {email,password}=req.body
  const user=await User.find({email})
  if(!user){
    return errorResponse(res,402,`invalid email`)
  }else{
    const comparePassword=bcrypt.hashSync(password,user.password)
    if(!comparePassword){
      return errorResponse(res,401,`invalid password`)
    }
    else{
      const token=Jwt.sign({user:user},process.env.SECRET_KEY,{expireIn:'1d'})
    if(!token){
      errorResponse(res,401,`no token provided`)
    }else{
      return req.status(201).json({
        token:token,
        data:{
          user:user
        }
      })
    }
    }

  }

}


}
export default usercontroller;
