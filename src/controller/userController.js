import User from "../model/User";
import bcrypt,{hash} from "bcrypt"

import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse"

import jwt from "jsonwebtoken"

class usercontroller {
  static async createUser(req, res) {

const {firstname,lastname,email,password}=req.body
    try {
      if (req.body.password !== req.body.confirmPassword) {
        return errorResponse(res,403,"password and confirm password is not matched")
        };
  
        const hashpassword=bcrypt.hashSync(req.body.password,10)
          const user =await User.create({firstname,lastname,email,password:hashpassword})
const status=201
const msg=`user successful create`
const data =user
return successResponse(res,status,msg,data);
      }catch (error) {
      if (error.code == 11000) {
        return errorResponse(res,403, `user alread exist`)
      } 
      else {
        return errorResponse(res,500,error)
      }
    }
  }
static async login(req,res){

  const {email,password}=req.body
  const usr=await User.findOne({email})

  if(!usr){
    return errorResponse(res,401,`invalid email or password`)
  }
else{
  const comparePassword=bcrypt.compareSync(password,usr.password)

  if (!comparePassword){
    return errorResponse(res,401,`invalid email or password`)
  }

  else{
    const token=jwt.sign({role:usr.role,email:usr.email,firstname:usr.firstname},
      process.env.SECRET_KEY,{expiresIn:"1d"})

    return res.status(200).json({
      token:token,
      data:{
        email:usr.email,
        firstname:usr.firstname,
        role:usr.role

      }
    })
  }
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

static async deleteOneUser(req,res){
  const id=req.params.id
  const userd=await User.findByIdAndDelete(id)
  if(!userd){
    errorResponse(res,401,`user with id ${id} not found`)
  }else{
    successResponse(res,200,`user successfuly deleted`,userd)
  }
}

static async upadateUser(req,res){
  const id= req.params.id
  const userd=await User.findByIdAndUpdate(id,req.body,{new:true})
  if(!userd){
    errorResponse(res,401,`user with id ${id} not updated`)
  }else{
    successResponse(res,200,`user succefuly updated`,userd)
  }
}

}
export default usercontroller;
