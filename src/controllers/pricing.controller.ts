import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { discountCoupons } from "../util/discounts";
import { COURSE_BASE_PRICE } from "../util/constants";

export class PricingController extends BaseController {

    public getCoursePricing(req:Request, res:Response){
        const course_name = <string>req.query?.course || COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.title;
        const coupon = req.query?.coupon || COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.minDiscountCode;
        if(course_name === COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.title){
            const dbCouponVal = discountCoupons.find(el => el.name === coupon);
            const pricing = {
                basePrice: COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.basePriceInRupee,
                course_name,
                discount: dbCouponVal?.value || COURSE_BASE_PRICE.ONLINE_SOFT_SKILLS_COURSE.minDiscount,
                couponApplied: !!dbCouponVal
            };
            return this.jsonRes(pricing, res, 200,'YTS coupon code applied successfully');
        }
        return this.errRes({},res,"Invalid course name", 404);
    }    
}
