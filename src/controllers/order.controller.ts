import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { OrderModel } from "../models/order.model";
import { razorpayInstance } from "../service/payment.service";
import { discountCoupons } from "../util/discounts";
import { OrderDoc, Pricing } from "../interfaces/types.module";
import { COURSE_BASE_PRICE } from "../util/constants";

export class OrderController extends BaseController {
  constructor() {
    super(new OrderModel());
  }

  private getCoursePricing(course_name?: string,coupon?: string): {abort: boolean,price?: Pricing}{
    course_name ||= COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.title;
    coupon ||= COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.minDiscountCode;

    if(course_name === COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.title){
        const dbCouponVal = discountCoupons.find(el => el.name === coupon);
        const pricing:Pricing = {
            basePrice: COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.basePriceInRupee,
            course_name,
            coupon,
            discount: dbCouponVal?.value || COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.minDiscount,
            couponApplied: !!dbCouponVal
        };
        return {abort:false, price: pricing};
    }
    return {abort:true};
  }

  public async createOrder(req: Request,res: Response){
    try{ // if order_id already exists and is valid we should return it 
      const user = res.locals.user.user;
      const course_name = <string>req.query?.course_name || COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.title;
      const coupon  = <string>req.query?.coupon || COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.minDiscountCode;

      const calPrice = this.getCoursePricing(course_name,coupon);
      if(calPrice.abort || !calPrice?.price) return this.errRes({},res,"Invalid Course Selected");

      const amount = calPrice.price.basePrice *(100 - calPrice.price.discount); // amount in paise
      const receipt = user._id;
      const notes =  {
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "course": calPrice.price.course_name,
        "coupon_code": calPrice.price.coupon,
        "coupon_value": calPrice.price.discount,
        "referred_by": req.body?.givenBy || 'admin'
      }

      razorpayInstance.orders.create({amount, currency:"INR", receipt, notes},async (err:any, razorpayOrderRes:any)=>{ 
        if(!err){
          const yts_order = {
            user: user._id,
            productName: notes.course,
            razorpayOrderId: razorpayOrderRes.id,
            razorpayResponse: razorpayOrderRes,
            amount: amount/100, // amount in our db in rupee
            discount:{
              code: notes.coupon_code,
              value: notes.coupon_value,
              givenBy: notes.referred_by
            }
          }
          const created_order = await this.model.create<OrderDoc>(yts_order);
          return this.jsonRes({order_id: razorpayOrderRes.id, amount: created_order.amount, discount: created_order.discount, rzpId: process.env.RAZORPAY_ID},res,201);
        }
        return this.handleHttpError(err,res,"Invalid login",401);
      })
    } catch(err) {
      return this.errRes(err,res,"Internal Server Error",500);
    }
  }
}
