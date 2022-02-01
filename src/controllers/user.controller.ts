import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { UserModel } from "../models/user.model";
import { Result, ValidationError, validationResult } from "express-validator";
import { UserDoc } from "../interfaces/types.module";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export class UserController extends BaseController {
  constructor() {
    super(new UserModel());
  }

  public async userRegistration(){

  }
  
  // public async userLogin(req: Request, res: Response) {
  //   const { email, password } = req.body;
  //   try {
  //       let user = await this.model.findOne<UserDoc>({email: email, isDeleted:false});
  //       const matchPassword = await bcrypt.compare(password, user?.password || "");
  //       if (!user || !matchPassword) {
  //           return this.handleHttpError({},res,"Username/Password is invalid",401);
  //       }

  //       if(user?.password)  User.password=undefined;
  //       const authToken = jwt.sign({User,valid:true,role:'User'},process.env.JWT_SECRET, { expiresIn: '12h' });
        
  //       return this.jsonRes({token:authToken,ytsToken:true},res,200);
  //   } catch (error: any) {
  //       return this.handleHttpError({},res,"Username/Password is invalid",401);
  //   }
  // }
}
