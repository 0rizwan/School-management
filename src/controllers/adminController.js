import Admin from "../models/adminModel.js"
import { Student } from "../models/studentModel.js";
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const adminLogin = AsyncHandler((req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "provide email and password"))
  }

  const admin = Admin.findOne({ email }).select('+password');

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