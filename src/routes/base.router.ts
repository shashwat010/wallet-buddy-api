import express = require('express');

export const baseRouter = express.Router();

// Set the common part of the path for the routes in this router
const base = '/'

baseRouter.get(`${base}`,(req,res)=>{
    return res.status(200).json({
        api_status: 'working',
        success: true,
    })
});
