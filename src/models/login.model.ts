import mongoose = require('mongoose')
import { Schema } from "mongoose";
import { BaseModel } from "./base.model";

const LoginSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User', // User schema does not exist as of now, but it will be created in future.
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, {timestamps: true});

export class LoginModel extends BaseModel {
    constructor() {
        super(mongoose.model('Login', LoginSchema))
    }

}
