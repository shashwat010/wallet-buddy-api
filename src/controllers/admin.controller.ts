import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { AdminModel } from "../models/admin.model";
import { Result, ValidationError, validationResult } from "express-validator";
import { AdminDoc } from "../interfaces/types.module";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export class AdminController extends BaseController {
  constructor() {
    super(new AdminModel());
  }

  public async adminSignup(req: Request, res: Response) {
    const errors:Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        let _errors:string[] = errors.array().map(err => err.msg)
        _errors = _errors.filter(function(item, pos) {
            return _errors.indexOf(item) == pos;
        })
        return this.handleHttpError(errors,res,_errors,401);
    }

    const salt = bcrypt.genSaltSync(10);
    const securePass = await bcrypt.hash(req.body.password, salt);
    req.body.password = securePass;
    return this.create(res, req.body);
  }

  public async adminLogin(req: Request, res: Response) {
    const errors:Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        let _errors:string[] = errors.array().map(err => err.msg)
        _errors = _errors.filter(function(item, pos) {
            return _errors.indexOf(item) == pos;
        })
        return this.handleHttpError(errors,res,_errors,401);
    }

    const { username, password } = req.body;
    try {
        let admin = await this.model.findOne<AdminDoc>({username:username,isDeleted:false});
        
        const matchPassword = await bcrypt.compare(password,admin?.password || "");
        if (!admin || !matchPassword) {
            return this.handleHttpError({matchPassword,admin},res,"Username/Password is invalid",401);
        }

        const authToken = jwt.sign({admin,valid:true},process.env.JWT_SECRET, { expiresIn: '12h' });
        
        return this.jsonRes({token:authToken},res,200);
    } catch (error: any) {
        return this.handleHttpError({},res,"Username/Password is invalid",401);
    }
  }
}
