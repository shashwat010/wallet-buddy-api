import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { discountCoupons } from "../util/discounts";

export class PricingController extends BaseController {

    public getCoursePricing(req:Request, res:Response){
        const course_name = <string>req.query?.course || 'online_soft_skills_course';
        const coupon = req.query?.coupon || 'YTS10';
        if(course_name === 'online_soft_skills_course'){
            const dbCouponVal = discountCoupons.find(el => el.name === coupon);
            const pricing = {
                basePrice: 4500,
                course_name,
                discount: dbCouponVal?.value || 10,
                couponApplied: !!dbCouponVal
            };
            return this.jsonRes(pricing, res, 200,'YTS coupon code applied successfully');
        }
        return this.errRes({},res,"Invalid course name", 404);
    }

    public verifyCouponCode(req:Request, res:Response){
        const {coupon} = req.body;
        const dbCouponVal = discountCoupons.find(el => el.name === coupon);
        if(dbCouponVal) return this.jsonRes({coupon: dbCouponVal, valid: true}, res, 200);
        return this.errRes({valid: false, coupon: null},res, "The coupon code entered is invalid", 403);
    }

    
}
