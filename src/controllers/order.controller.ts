import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { OrderModel } from "../models/order.model";
import { OrderDoc } from "../interfaces/types.module";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export class OrderController extends BaseController {
  constructor() {
    super(new OrderModel());
  }

}
