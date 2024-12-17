import { createSendToken } from "../middlewares/auth.js";
import { Admin } from "../models/adminModel.js";
import { Student } from "../models/studentModel.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const login = AsyncHandler(async (req, res, next) => {

    const { email, password, userType } = req.body;

    if (!email || !password) {
        return next(new ApiError(400, "provide email and password"))
    }

    let UserModel;

    switch (userType) {
        case 'student':
            UserModel = Student;
            break;
        case 'admin':
            UserModel = Admin;
            break;
        case 'teacher':
            UserModel = Teacher;
            break;
    }

    const user = await UserModel.findOne({ email }).select('+password');
    console.log("USER", user)

    if (!user) {
        return next(new ApiError(401, `${userType} not found`))
    }
    else if (!(await user.isValidPassword(password))) {
        return next(new ApiError(401, 'Incorrect email or password'))
    }

    createSendToken(user, 200, res)

})