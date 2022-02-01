import { Document } from "mongoose";

export interface UserBase{

}
export interface OrderBase{

}
export interface AdminBase{
    username:string,
    password?:string,
    name:string,
    email:string,
    isDeleted:boolean,
}

interface MongooseDoc{
    _id:string,
    createdAt:Date,
    updatedAt:Date,
}

export interface AdminDoc extends MongooseDoc,AdminBase {}

export interface UserDoc extends MongooseDoc,UserBase {}

export interface OrderDoc extends MongooseDoc, OrderBase {}