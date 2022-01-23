import mongoose = require('mongoose')
import { Schema } from "mongoose";
import { BaseModel } from "./base.model";
import { validateEmail } from '../util/constants';

const Admin: Schema = new Schema({
    username: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    isDeleted: {
         type: Boolean,
         default: false 
    },
}, {timestamps: true});

export class AdminModel extends BaseModel {
    constructor() {
        super(mongoose.model('Admin', Admin))
    }

}
