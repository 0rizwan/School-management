import { createSendToken } from "../middlewares/auth.js";
import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const login = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError(400, "provide email and password"))
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(404, 'User not found'));

    // Verify password
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) return next(new ApiError(401, 'Incorrect email or password'));

    createSendToken(user, 200, res);
})

export const logout = AsyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie('accessToken')
        .json(new ApiResponse(200, {
            status: 'success',
            data: {}
        }, "logout successfull!"));
})

