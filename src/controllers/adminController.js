import Admin from "../models/adminModel.js"
import {ApiError} from '../utils/ApiError.js'
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const adminLogin = AsyncHandler((req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "provide email and password"))
  }

  const admin = Admin.findOne({ email }).select('+password');

})