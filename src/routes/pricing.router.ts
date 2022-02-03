import express = require('express');
import { Response, Request } from "express";
import { handleValidationError, userRoleGuard } from '../middleware';
import { body } from 'express-validator';
import { pricingController } from '../controllers/controllers.module';

export const pricingRouter = express.Router();

// Set the common part of the path for the routes in this router
const base = '/pricing'

pricingRouter.post(`${base}/verify`, userRoleGuard, [
    body('coupon','coupon code is required').exists(),
], handleValidationError, (req: Request, res: Response) => pricingController.verifyCouponCode(req,res));

pricingRouter.get(`${base}`, (req: Request, res:Response)=> pricingController.getCoursePricing(req,res));