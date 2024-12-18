import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/userModel.js";

const signToken = (user) => {
    return jwt.sign({ _id: user._id, userType: user.userType }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const createSendToken = (user, statusCode, res) => {
    const token = signToken(user)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true
    }

    //Remove password from output
    user.password = undefined;

    return res
        .status(statusCode)
        .cookie('accessToken', token, cookieOptions)
        .json(new ApiResponse(statusCode, {
            status: 'success',
            token,
            data: {
                user
            }
        }, "login successfull!"));
}

export const isAuthenticated = AsyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return next(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
        return next(new ApiError(404, "User not found"));
    }
    req.user = user;
    next();
})

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (req.user.role != "super admin") {
            if (!roles.includes(req.user.role)) {
                return next(new ApiError(403, 'You do not have permission to perform this action'))
            }
        }
        next();
    }
}
