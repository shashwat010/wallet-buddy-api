import { Schema } from "mongoose";
import mongoose = require('mongoose')
import { BaseModel } from "./base.model";

const NestedSchema = new Schema({
    name: {type: String}
})

const ExampleSchema: Schema = new Schema({
    title: { type: String },
    date_created: { type: Number },
    date_modified: { type: Number },
    order: { type: Number, default: 0 },
    hide: { type: Boolean, default: false },
    details: NestedSchema
});

export class ExampleModel extends BaseModel {
    constructor() {
        super(
            mongoose.model('Example', ExampleSchema)
        )
    }

}
