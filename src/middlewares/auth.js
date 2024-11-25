import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

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
