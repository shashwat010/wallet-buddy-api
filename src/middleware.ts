const rateLimit = require('express-rate-limit');
const cors = require('cors');

import bodyParser = require('body-parser');
import * as _cors from 'cors';

import { Response, Request, NextFunction } from 'express';
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
        console.log(origin);
        console.log(env().stage);
        if(env().stage === 'dev') callback(null, true);
        else if (whitelist.includes(<string>origin) || origin?.includes('yoursthatsenior.com')) {
            callback(null, true);
        } else {
            callback(new Error("API access denied."))
        }
    }
}

export const middleware = [
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req, res);
        next();
    },
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
    },
];

export const options = [

]