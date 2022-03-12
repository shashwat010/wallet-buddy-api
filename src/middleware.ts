const rateLimit = require('express-rate-limit');
const cors = require('cors');
const jwt = require("jsonwebtoken");

import bodyParser = require('body-parser');
import * as _cors from 'cors';

import { Request , Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

import { env } from './yts.env';

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const whitelist:string[] = ['https://yoursthatsenior.netlify.app','https://yts-produciton.netlify.app', 'https://yoursthatsenior.com'];
const corsOptions: _cors.CorsOptions = {
    maxAge: 3600,
    origin: (origin, callback):void => {
        if(env().stage === 'dev') callback(null, true);
        else if (whitelist.includes(<string>origin) || origin?.includes('yoursthatsenior.com')) {
            callback(null, true);
        } else {
            callback(new Error("API access denied."))
        }
    }
}

export const middleware = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(corsOptions),
    limiter,
    (req: Request, res: Response, next: NextFunction) => {
        res.set('Cache-Control', 'no-store, max-age=0')
        next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    },
  (error:any, req:Request, res:Response, next:NextFunction) => {
      if (error.type == 'time-out') return res.status(408).json(error)
      else return res.status(500).json({
          message: error.message
      })
    }
];

export const options = [

]

const handleAuthError = (res: Response, err ?: any) =>{
    return res.status(403).json({
        error: err,
        success: false,
        message: "You are not Authorized, Please login!"
    })
}

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] || req.headers["Authorization"];

  if (!token) return handleAuthError(res);
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    res.locals.user = decoded;
    
  } catch (err) {
    return handleAuthError(res,err);
  }
  return next();
};

export const adminRoleGuard = (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers["authorization"] || req.headers["Authorization"];
    
  if (!token) return handleAuthError(res)
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    res.locals.user = decoded;
    if(decoded?.role !== 'admin') return handleAuthError(res);
  } catch (err) {
    return handleAuthError(res,err);
  }
  return next();
} 

export const userRoleGuard = (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers["authorization"] || req.headers["Authorization"];
    
  if (!token) return handleAuthError(res)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    if(decoded?.role !== 'user') return handleAuthError(res);
  } catch (err) {
    return handleAuthError(res,err);
  }
  return next();
}
  
export const handleValidationError = (req:Request, res:Response, next: NextFunction)=>{
  const errors:Result<ValidationError> = validationResult(req);
  let _errors:string[] = errors.array().map(err => err.msg)
  _errors = _errors.filter(function(item, pos) {
    return _errors.indexOf(item) == pos;
  })

  if(_errors.length > 0) return res.status(400).json({
    error: _errors,
    success: false,
    message: _errors
  })

  next();
}
