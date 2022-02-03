import mongoose = require('mongoose')
import { Schema } from "mongoose";
import { BaseModel } from "./base.model";
import { validateEmail, validatePhoneNumber } from '../util/constants';

const AddressSchema: Schema = new Schema({
    line1:{
        type: String,
        trim: true,
        required: false,
        lowercase: true,
        default: 'no address',
    },
    line2:{
        type: String,
        required: false,
        trim: true,
        default:'',
    },
    state:{
        type: String,
        required: false,
        default: 'delhi',
    },
    pincode:{
        type: Number,
        required: false,
        default: -1,
    }
});

const User: Schema = new Schema({
    password:{
        type: String,
        required: [true,'Password is required'],
    },
    name:{ // both first and last name
        type: String,
        required:true,
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    phone:{
        type: String,
        required: [true, 'Phone number is mandatory'],
        unique: true,
        lowercase: true,
        minlength: [10, 'Phone number should be at least 10 digits long'],
        validate:[validatePhoneNumber,'Please, provide a valid phone number']
    },
    role:{
        type: String,
        default:"user"
    },
    status:{
        emailVerified:{
            type: Boolean,
            default: false
        },
        phoneVerified:{
            type: Boolean,
            default: false
        },
        isPWDVerified:{
            type: Boolean,
            default: false
        },
        passwordEnabled:{
            type:Boolean,
            default: false,
        }
    },
    address: AddressSchema,
    workingStatus:{
        type: String,
        enum:['job','student'],
        default:'student',
        required: false,
        lowercase: true,
    },
    isPWD:{
        type: Boolean,
        default: false,
    },
    pwdDescription:{
        type: String,
        required: false,
        default:'N/A',
    },
    dob:{
        type:Date,
        default: 1643920207189,
        required: true
    },
    isDeleted: {
         type: Boolean,
         default: false 
    },
}, { timestamps: true });

export class UserModel extends BaseModel {
    constructor() {
        super(mongoose.model('User', User))
    }

}
