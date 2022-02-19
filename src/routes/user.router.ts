import express = require('express');
import { userController } from '../controllers/controllers.module';
import { Response, Request } from "express";
import { adminRoleGuard, handleValidationError, userRoleGuard } from '../middleware';

export const userRouter = express.Router();

const base = '/user'

userRouter.post(`${base}/register`, [], handleValidationError, (req: Request, res: Response) => { userController.userRegistration(req,res)})
userRouter.post(`${base}/login`, [], handleValidationError, (req: Request, res: Response) => { userController.userLogin(req,res)})
userRouter.put(`${base}/update/:id`,userRoleGuard, (req:Request, res:Response) => {userController.updateDetails(req,res,req.params.id)})

userRouter.get(`${base}`, adminRoleGuard, (req:Request,res:Response)=> userController.paginatedFind(res, {}, req.query));
userRouter.get(`${base}/:id`, adminRoleGuard, (req:Request,res:Response)=> userController.findOne(res,{_id : req.params.id}));

// userRouter.post(`${base}/otp/resend`,[],handleValidationError, ()=>{});

/**
 * otp verification || async and blocking
 * update user verification status
 */
// userRouter.put(`${base}/otp/verification`,[], handleValidationError, (req:Request, res:Response) => {
    
// })

// no phone number update allowed!!

/**
 * Admin/User(basic info) : PUT - /user/update/:id -> generic update function!!
 * Admin : DELETE - /user/:id -> isDelete = true;
 */