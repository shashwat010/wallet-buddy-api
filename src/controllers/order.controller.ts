import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { OrderModel } from "../models/order.model";
import { razorpayInstance } from "../Razorpay/razorCredentials";

export class OrderController extends BaseController {
  constructor() {
    super(new OrderModel());
  }

  public createOrder(req: Request,res: Response){
    const {amount,currency,receipt} = req.body;
    razorpayInstance.orders.create({amount, currency, receipt},(err:any, order:any)=>{ 
        if(!err)
          this.jsonRes({order},res,200);
        else
          this.handleHttpError(err,res,"Invalid login",401);
      }
  )
  }
}
