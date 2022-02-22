import mongoose = require('mongoose')
import { Schema } from "mongoose";
import { BaseModel } from "./base.model";

const Order: Schema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    // need to be updated based on the createdAt timestamp, as it gets expired in 5-10mins.
    razorpayOrderId: {
        type: String,
        required: true,
    },
    razorpayResponse: {
        type: Object,
        required: false,
        default: null,
    },
    amount:{ // in paisa
        type: Number,
        required: true,
    },
    discount:{
        // if previous order_id gets expired, we reset values.
        givenBy:{
            type: String,
            required: false,
            default: 'Admin',
        },
        code:{
            type: String,
            required: false,
            default: 'none',
        },
        value:{
            type: Number,
            required: false,
            default: 0,
        }
    },
}, {timestamps: true});

export class OrderModel extends BaseModel {
    constructor() {
        super(mongoose.model('Order', Order))
    }

}
