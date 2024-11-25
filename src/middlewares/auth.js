import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/ApiResponse.js"
import { AsyncHandler } from "../utils/AsyncHandler.js";

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

    res.cookie('jwt', token, cookieOptions)

    //Remove password from output

    user.password = undefined;

    res.status(statusCode).json(new ApiResponse(statusCode, {
        status: 'success',
        token,
        data: {
            user
        }
    }, "login successfull!"))
}


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.body.role)) {
            return next(new ApiError(403, 'You do not have permission to perform this action'))
        }
        next()
    }

}

export const isAuthenticated = (Model) => AsyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(Model, "Model")
    if (!token) {
        return next(new ApiError(401, "Unauthorized request"));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Model.findById(decodedToken._id);
    if (!user) {
        return next(new ApiError(401, 'Invalid access token'));
    }
    req.user = user;
    next();
})
