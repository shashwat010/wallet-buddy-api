import { Document } from "mongoose";

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

export interface AdminDoc extends MongooseDoc,AdminBase {
    
}