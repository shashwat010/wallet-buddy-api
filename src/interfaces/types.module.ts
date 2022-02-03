import { Document } from "mongoose";

export interface UserBase{
    password?: string,
    name: string,
    email: string,
    phone: string,
    status:{
        emailVerified: boolean,
        phoneVerified: boolean,
        isPWDVerified: boolean,
        passwordEnabled: boolean        
    },
    address:{
        line1: string,
        line2: string,
        state: string,
        pincode: number
    }
    workingStatus: string,
    isPWD: boolean,
    pwdDescription: string,
    isDeleted: boolean

}
export interface OrderBase{
    user: string,
    productName: string,
    razorpayOrderId: string,
    razorpayResponse: object,
    amount: number,
    discount:{
        givenBy: string,
        code: string,
        value: number
    }
}
export interface AdminBase{
    username:string,
    password?:string,
    name:string,
    email:string,
    isDeleted:boolean,
    role: string
}

interface MongooseDoc{
    _id:string,
    createdAt:Date,
    updatedAt:Date,
}

export interface AdminDoc extends MongooseDoc,AdminBase {}

export interface UserDoc extends MongooseDoc,UserBase {}

export interface OrderDoc extends MongooseDoc, OrderBase {}