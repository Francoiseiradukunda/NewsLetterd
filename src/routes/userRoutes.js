import express from "express";

import usercontroller from "../controller/userController";
import dataChequer from "../middlewares/dataChequer";
import validator from "../middlewares/validator";

const router=express.Router()

router.post("/",dataChequer.userRegisterIsEmpty,dataChequer.emailExist
,validator.userAccountRule,validator.inputValidator,usercontroller.createUser)

router.get("/",usercontroller.getAllUsers)
router.delete("/",usercontroller.deleteAllUsers)
router.get('/:ido',usercontroller.getOneUser)
router.delete("/:id",usercontroller.deleteOneUser)
router.put("/:id",usercontroller.upadateUser)
router.post("/login",usercontroller.login)

export default router