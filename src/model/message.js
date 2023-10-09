import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
emai:{
    type:string,
    required:true
},
email:{
    type:string,
    required:true
},
sendAt:{
    type:Date,
    default:Date.now()
}
})
const Message=mongoose.model("Message",messageSchema)
export default Message