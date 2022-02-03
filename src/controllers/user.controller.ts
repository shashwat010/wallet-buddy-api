import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { UserModel } from "../models/user.model";
import { UserDoc } from "../interfaces/types.module";
const jwt = require("jsonwebtoken");


export class UserController extends BaseController {
  constructor() {
    super(new UserModel());
  }

  public async userRegistration(req: Request, res: Response){
    try{
      let user= await this.model.create<UserDoc>(req.body); 
      user.password = undefined;   
      const authToken = jwt.sign({user,role:'user'},process.env.JWT_SECRET, { expiresIn: '12h' });
      return this.jsonRes({token:authToken,ytsToken:true},res,201);
    } catch(err){
      this.errRes(err,res);
    }
  }
}
