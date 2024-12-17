import { Admin } from "../models/adminModel.js"
import { Student } from "../models/studentModel.js";
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createSendToken } from "../middlewares/auth.js";
import { Teacher } from "../models/teacherModel.js";

export const createAdmin = AsyncHandler(async (req, res, next) => {
  const { name, email, password, role, status } = req.body;

  const newUser = await Admin.create({
    name,
    email,
    password,
    role,
    status
  })
  newUser.password = undefined;

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User Created Successfully!"))
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
  const { firstName, lastName, contact, department, subjects, dateOfBirth, hireDate, qualifications, experience, gender, address, role } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !gender || Object.keys(address).length == 0 || Object.keys(contact).length == 0 || Object.keys(parentDetails).length == 0) {
    return next(new ApiError(400, "All fields are required"));
  }

  const isTeacherExist = await Teacher.findOne({
    $or: [{ 'contact.phoneNumber': contact.phoneNumber }, { 'contact.email': contact.email }]
  })
  if (isTeacherExist) {
    return next(new ApiError(400, "Teacher already exists"))
  }

  const generatedPassword = firstName + "@" + new Date(dateOfBirth).getFullYear();
  const newTeacher = await Teacher.create({
    firstName,
    lastName,
    department,
    subjects,
    dateOfBirth,
    hireDate,
    qualifications,
    experience,
    password: generatedPassword,
    gender,
    address,
    contact,
    role
  })

  return res
    .status(201)
    .json(new ApiResponse(201, newTeacher, "Teacher registered successfully"))

})
