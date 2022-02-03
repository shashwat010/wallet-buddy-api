import express = require('express');
import { orderController } from '../controllers/controllers.module';
import { body } from 'express-validator';
import { Response, Request } from "express";
import { adminRoleGuard, handleValidationError, userRoleGuard } from '../middleware';

export const orderRouter = express.Router();

// Set the common part of the path for the routes in this router
const base = '/order'

/**
 * create razorpay order
 * check if user order exist, if exist update existing order
 * return razorpay_orderId
*/
orderRouter.post(`${base}/new`, [], userRoleGuard,handleValidationError, (req: Request, res: Response) => {orderController.createOrder(req,res)})

orderRouter.get(`${base}`, adminRoleGuard, (req:Request,res:Response)=> orderController.find(res));
orderRouter.get(`${base}/:id`, adminRoleGuard, (req:Request,res:Response)=> orderController.findOne(res,{_id : req.params.id}));
