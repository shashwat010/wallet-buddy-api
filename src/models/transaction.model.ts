import mongoose = require('mongoose')
import { Schema } from "mongoose";
import { BaseModel } from "./base.model";

const Transaction: Schema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ["profit","loss"],
    },
    category:{
        type:String,
        required: true,
    },
    amount:{
        type:Number,
        required:true
    },
    date: {
        type:String,
        required:true,
        trim: true,
    },
    isDeleted: {
         type: Boolean,
         default: false 
    },
}, {timestamps: true});

export class TransactionModel extends BaseModel {
    constructor() {
        super(mongoose.model('Transaction', Transaction))
    }

}
