import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { Result, ValidationError } from "express-validator";
import { TransactionModel } from "../models/transaction.model";
import { TransactionDoc } from "../interfaces/types.module";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export class TransactionController extends BaseController {
  constructor() {
    super(new TransactionModel());
  }
  
  handleValidationError=(res: Response,errors:Result<ValidationError>)=>{
    let _errors:string[] = errors.array().map(err => err.msg)
        _errors = _errors.filter(function(item, pos) {
            return _errors.indexOf(item) == pos;
        })
    return this.handleHttpError(errors,res,_errors,401);
  }

  public async createTransaction(req: Request, res: Response) {
      try{
        let created_transaction = await this.model.create<TransactionModel>(req.body);
        return this.jsonRes(created_transaction,res,201);

    } catch(e){
        return this.errRes(e,res,"Internal Server Error",500);
    }
  }

  public async retrieveTransaction(req: Request, res: Response) {
      try{
        let retrievedTransaction = await this.model.findMany<TransactionDoc>({user:res.locals.id});
        return this.jsonRes(retrievedTransaction,res,200);
      }
      catch(e){
          return this.errRes(e,res,"Internal Server Error",500);
      }
  }
}
