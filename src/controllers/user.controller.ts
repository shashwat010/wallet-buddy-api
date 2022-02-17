import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { UserModel } from "../models/user.model";
import { UserDoc } from "../interfaces/types.module";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


export class UserController extends BaseController {
  constructor() {
    super(new UserModel());
  }

  public async userRegistration(req: Request, res: Response){
    try{
      const salt = bcrypt.genSaltSync(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
      req.body.password = securePass;
      let user= await this.model.create<UserDoc>(req.body); 
      user.password = undefined;   
      const authToken = jwt.sign({user,role:'user'},process.env.JWT_SECRET, { expiresIn: '12h' });
      return this.jsonRes({token:authToken,ytsToken:true},res,201);
    } catch(err){
      this.errRes(err,res);
    }
  }

  public async userLogin(req: Request, res: Response){
    const {email,password} = req.body;
    try{
      let user = await this.model.findOne<UserDoc>({email:email,isDeleted: false});  

      const matchPassword = await bcrypt.compare(password,user?.password || "");
      if (!user || !matchPassword) {
        return this.handleHttpError({},res,"Email/Password is invalid", 401);
      }

      const authToken = jwt.sign({user,role:'user'}, process.env.JWT_SECRET, { expiresIn: '12h' });
      return this.jsonRes({token:authToken,ytsToken:true}, res, 200);
    } catch(err){
      this.errRes(err,res);
    }
  }

  public async updateDetails(req: Request, res: Response,id: string){
    try{
      let user = await this.model.updateById<UserDoc>(id,req.body);
      
      user.password=undefined;
      const authToken = jwt.sign({user, role:'user'}, process.env.JWT_SECRET, { expiresIn: '12h' });
      return this.jsonRes({token: authToken, ytsToken: true}, res, 200);
    } catch(err){
      this.errRes(err,res,"Invalid document id");
    } 
  }
}
