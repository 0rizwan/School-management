import Admin from "../models/adminModel.js"
import { Student } from "../models/studentModel.js";
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createSendToken } from "../middlewares/auth.js";
import { Teacher } from "../models/teacherModel.js";
import { Class } from "../models/classModel.js";


export const createAdmin = AsyncHandler(async (req, res, next) => {

  const newUser = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    status: req.body.status
  })
  newUser.password = undefined;

  res.status(201).json(new ApiResponse(201, newUser, "User Created Successfully!"))
})

export const studentRegistration = AsyncHandler(async (req, res, next) => {
  const { firstName, lastName, dateOfBirth, gender, address, contact, parentDetails } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !gender || Object.keys(address).length == 0 || Object.keys(contact).length == 0 || Object.keys(parentDetails).length == 0) {
    return next(new ApiError(400, "All fields are required"));
  }

  const isStudentExist = await Student.findOne({
    $or: [{ 'contact.phoneNumber': contact.phoneNumber }, { 'contact.email': contact.email }]
  })
  if (isStudentExist) {
    return next(new ApiError(400, "Student already exists"))
  }

  const generatedPassword = firstName + "@" + new Date(dateOfBirth).getFullYear();
  const newStudent = await Student.create({
    firstName,
    lastName,
    dateOfBirth,
    gender,
    password: generatedPassword,
    address,
    contact,
    parentDetails
  })

  return res
    .status(201)
    .json(new ApiResponse(201, newStudent, "Student registered successfully"))

})

export const teacherRegistration = AsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, department, subjects, gender, password, experience, qualifications, hireDate, dateOfBirth, address, role, isActive } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !gender || !email || !department || !phone || !subjects || !qualifications || !experience || !hireDate || !role || !isActive || Object.keys(address).length == 0) {
    return next(new ApiError(400, "All fields are required"));
  }

  const isTeacherExist = await Teacher.findOne({
    $or: [{ 'phone': phone }, { 'email': email }]
  })
  if (isTeacherExist) {
    return next(new ApiError(400, "Teacher already exists"))
  }

  const generatedPassword = firstName + "@" + new Date(dateOfBirth).getFullYear();
  const newTeacher = await Teacher.create({
    firstName,
    lastName,
    email,
    phone,
    department,
    subjects,
    gender,
    experience,
    qualifications,
    hireDate,
    dateOfBirth,
    address,
    role,
    isActive,
    password: generatedPassword,
  })

  newTeacher.password = undefined;
  return res
    .status(201)
    .json(new ApiResponse(201, newTeacher, "Teacher registered successfully"))

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


export const getAllStudent = AsyncHandler(async(req, res, next) => {
  const doc = await Student.find();

  res.status(200).json(new ApiResponse(200, doc))
})

export const getAllClass = AsyncHandler(async(req, res, next) => {
  const doc = await Class.find().populate("classTeacher").populate("students");

  res.status(200).json(new ApiResponse(200, doc))
})

export const getAllTeacher = AsyncHandler(async(req, res, next) => {
  const doc = await Teacher.find();

  res.status(200).json(new ApiResponse(200, doc))
})