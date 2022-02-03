import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { OrderModel } from "../models/order.model";
import { razorpayInstance } from "../service/payment.service";

export class OrderController extends BaseController {
  constructor() {
    super(new OrderModel());
  }

  // req - user_id, 
  // async
  // calculate price with/without .
  // order_id from razorpay
  // save order in out db.
  // email to our support. [optional]

  public createOrder(req: Request,res: Response){
    const {amount,receipt} = req.body;
    // added noted to razorpay -> name,email,phone,course,  
    // receipt - user_id;
    // offer_id - discount coupon code.
    const notes =  {
      "key1": "value3",
      "key2": "value2"
    }
    razorpayInstance.orders.create({amount, currency:"INR", receipt, notes},(err:any, order:any)=>{ 
        if(!err)
          this.jsonRes({order},res,200);
        else
          this.handleHttpError(err,res,"Invalid login",401);
      }
    )
  }
}
