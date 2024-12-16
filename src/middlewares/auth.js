import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/ApiResponse.js"
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Admin from "../models/adminModel.js";
import {Teacher} from "../models/teacherModel.js";
import {Student} from "../models/studentModel.js";

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
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

// export const isAuthenticated = AsyncHandler(async (req, res, next) => {
//     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//         return next(new ApiError(401, "Unauthorized request"));
//     }
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await Admin.findById(decodedToken._id);

//     if (!user) {
//         return next(new ApiError(401, 'Invalid access token'));
//     }
//     req.user = user;
//     next();
// })

export const isAuthenticated = (Model) => {
    return AsyncHandler(async (req, res, next) => {
        if (req.cookies.accessToken) {
            console.log("req.cookies", req.cookies.accessToken)
        }
        console.log()
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return next(new ApiError(401, "Unauthorized request"));
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Model.findById(decodedToken.id);
        if (!user) {
            return next(new ApiError(401, `login in as authorized user`));
        }
        console.log("user", user)
        req.user = user;
        next();
    })
}


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log(req.user.role, roles, "role")
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'You do not have permission to perform this action'))
        }
        next()
    }
}
