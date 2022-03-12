import express = require('express');
import { adminController } from '../controllers/controllers.module';
export const routerAdmin = express.Router();
import { body } from 'express-validator';
import { Response, Request } from "express";
import { adminRoleGuard, authGuardMiddleware } from '../middleware';

// Set the common part of the path for the routes in this router
const base = '/auth'

routerAdmin.post(`${base}/login`,[
    body('username','Username/Password is invalid').exists(),
    body('password','Username/Password is invalid').exists(),
], (req: Request, res: Response) => { adminController.adminLogin(req,res)})

routerAdmin.post(`${base}/signup`,[
    body('username','Username/Password cannot be blank').exists(),
    body('password','Username/Password cannot be blank').isLength({ min: 2 }),
    body('name','name cannot be blank').exists(),
],(req: Request, res: Response) => { adminController.adminSignup(req,res)});

routerAdmin.get(`${base}/authToken`,authGuardMiddleware,(req: Request,res: Response) => { adminController.verifyToken(req,res)});