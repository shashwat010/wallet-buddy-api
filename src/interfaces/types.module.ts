import { Document } from "mongoose";
import { StorageEngine } from "multer";

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
export interface AdminBase{
    username:string,
    password?:string,
    name:string,
    email:string,
    isDeleted:boolean,
}

interface TransactionBase{
    user:string,
    type:string,
    category:string,
    amount:number,
    date:string
}

interface MongooseDoc{
    _id:string,
    createdAt:Date,
    updatedAt:Date,
}


export interface AdminDoc extends MongooseDoc,AdminBase {}

export interface TransactionDoc extends MongooseDoc,TransactionBase {}

export interface UserDoc extends MongooseDoc,UserBase {}