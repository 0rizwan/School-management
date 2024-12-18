import { Student } from "../models/studentModel.js";
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createSendToken } from "../middlewares/auth.js";
import { Subject } from "../models/subjectModel.js";

export const getAllSubjects = AsyncHandler(async (req, res, next) => {
    const doc = await Subject.find();

    res.status(200).json(new ApiResponse(200, doc))
})