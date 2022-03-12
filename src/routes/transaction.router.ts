import express = require('express');
import { adminController, transactionController } from '../controllers/controllers.module';
export const routerTransaction = express.Router();
import { body } from 'express-validator';
import { Response, Request } from "express";
import { adminRoleGuard, authGuardMiddleware } from '../middleware';

// Set the common part of the path for the routes in this router
const base = '/transaction'

routerTransaction.post(`${base}/create`,authGuardMiddleware,(req: Request,res: Response) =>{ transactionController.createTransaction(req,res)});

routerTransaction.get(`${base}`,authGuardMiddleware,(req :Request, res: Response) =>{ transactionController.retrieveTransaction(req,res)});
