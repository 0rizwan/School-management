import Admin from "../models/adminModel.js"
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createSendToken } from "../middlewares/auth.js";


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

export const adminLogin = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError(400, "provide email and password"))
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !(await admin.isValidPassword(password))) {
        return next(new ApiError(401, 'Incorrect email or password'))
    }
    
    createSendToken(admin, 200, res)

})
