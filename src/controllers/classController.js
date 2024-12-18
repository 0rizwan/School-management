import { Admin } from "../models/adminModel.js"
import { Student } from "../models/studentModel.js";
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createSendToken } from "../middlewares/auth.js";
import { Teacher } from "../models/teacherModel.js";
import { Class } from "../models/classModel.js";

export const getAllClass = AsyncHandler(async (req, res, next) => {
    const doc = await Class.find().populate("classTeacher").populate("students");

    res.status(200).json(new ApiResponse(200, doc))
})

export const createClass = AsyncHandler(async (req, res, next) => {
    const { name, classNumber, section, classTeacher, students, subjectTeacher, schedule } = req.body;

    if (!name || !classNumber || !section || !classTeacher || !students || !subjectTeacher || !schedule) {
        return next(new ApiError(400, "All fields are required"));
    }

    const isClassExist = await Class.findOne({ classNumber });

    if (isClassExist) {
        return next(new ApiError(400, "Class already exists"))
    }

    const newClass = await Class.create({
        name, classNumber, section, classTeacher, students, subjectTeacher, schedule
    })

    // const populatedClass = await Class.findById(newClass._id)
    //   .populate({ path: 'subjectTeacher.teacher', select: '-__v -updatedAt -createdAt -department -subjects -phone -role -password -experience -qualifications -hireDate -dateOfBirth -emergencyContact -email -address' })
    //   .populate({ path: 'classTeacher', select: '-__v -updatedAt -createdAt -role -password -experience -qualifications -hireDate -dateOfBirth -emergencyContact -email -address' })
    //   .populate({ path: 'students', select: '-__v -address -contact -dateOfBirth -password -parentDetails -updatedAt -createdAt' })
    //   .lean()

    return res.status(201).json(new ApiResponse(201, populatedClass, "Class created Successfully"));
})