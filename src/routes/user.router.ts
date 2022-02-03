import express = require('express');
import { userController } from '../controllers/controllers.module';
import { body } from 'express-validator';
import { Response, Request } from "express";
import { adminRoleGuard, handleValidationError, userRoleGuard } from '../middleware';

export const userRouter = express.Router();

// Set the common part of the path for the routes in this router
const base = '/user'

userRouter.post(`${base}/register`, [], handleValidationError, (req: Request, res: Response) => { userController.userRegistration(req,res)})
userRouter.put(`${base}/update/:id`,userRoleGuard, (req:Request, res:Response) => userController.updateById(res, req.params.id, req.body));

// userRouter.post(`${base}/otp/resend`,[],handleValidationError, ()=>{});

/**
 * otp verification || async and blocking
 * update user verification status
 */
// userRouter.put(`${base}/otp/verification`,[], handleValidationError, (req:Request, res:Response) => {
    
// })

userRouter.get(`${base}`, adminRoleGuard, (req:Request,res:Response)=> userController.find(res));
userRouter.get(`${base}/:id`, adminRoleGuard, (req:Request,res:Response)=> userController.findOne(res,{_id : req.params.id}));

// no phone number update allowed!!

/**
 * Admin/User(basic info) : PUT - /user/update/:id -> generic update function!!
 * Admin : DELETE - /user/:id -> isDelete = true;
 */